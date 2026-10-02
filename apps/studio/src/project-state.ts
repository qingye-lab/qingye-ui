import type {Theme} from './shared';

export type Current={status:string;validation:{errors:string[]};theme:Theme|null;css:string|null;fingerprint:string|null;generatedFingerprint:string|null;configFingerprint:string;registry:{name:string;definitions:{value:string}[]}[];generatedMatches:boolean;legacy:any[]};
type Api=(url:string,body?:unknown,nonce?:string)=>Promise<any>;
type Operation='load'|'preview'|'apply'|'import'|'impact'|'check'|'reports';
type Ticket={project:string;generation:number;operation:Operation;request:number;candidateRevision?:number};

export type ProjectState={
  project:string;loading:boolean;ready:boolean;busy:boolean;previewPending:boolean;importing:boolean;candidateRevision:number;
  current:Current|null;candidate:Theme|null;info:any;compatibility:any;
  candidateCss:string;previewCandidate:Theme|null;diff:any[];
  error:string;message:string;impact:any;reports:any;check:any;
};
function emptyState(project=''):ProjectState{
  return {project,loading:false,ready:false,busy:false,previewPending:false,importing:false,candidateRevision:0,current:null,candidate:null,info:null,compatibility:null,candidateCss:'',previewCandidate:null,diff:[],error:'',message:'',impact:null,reports:null,check:null};
}

/** Owns every result displayed for the selected project, including discarded requests. */
export class StudioProjectState{
  private state=emptyState();
  private generation=0;
  private candidateRevision=0;
  private requests=new Map<Operation,number>();
  private listeners=new Set<()=>void>();
  constructor(private api:Api){}
  getSnapshot=()=>this.state;
  subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
  dispose=()=>{this.generation++;this.listeners.clear();};
  private update(patch:Partial<ProjectState>){this.state={...this.state,...patch};this.listeners.forEach(listener=>listener());}
  private begin(operation:Operation,candidate=false):Ticket{
    const request=(this.requests.get(operation)??0)+1;
    this.requests.set(operation,request);
    return {project:this.state.project,generation:this.generation,operation,request,...(candidate?{candidateRevision:this.candidateRevision}:{})};
  }
  private owns(ticket:Ticket){
    return ticket.project===this.state.project&&ticket.generation===this.generation&&ticket.request===this.requests.get(ticket.operation)&&(ticket.candidateRevision===undefined||ticket.candidateRevision===this.candidateRevision);
  }
  private themeBody(theme:Theme,current:Current,apply=false){
    return {theme,fingerprint:current.fingerprint,generatedFingerprint:current.generatedFingerprint,configFingerprint:current.configFingerprint,apply};
  }
  canEdit=()=>this.state.ready&&!this.state.loading&&!this.state.busy;
  canApply=()=>this.canEdit()&&!this.state.previewPending&&!this.state.error&&!!this.state.candidate&&!!this.state.previewCandidate&&!!this.state.candidateCss&&!!this.state.compatibility?.available&&(!!this.state.diff.length||!this.state.current?.generatedMatches);

  async load(project:string,message=''){
    const previous=this.state;
    this.generation++;
    this.candidateRevision++;
    // A reread may keep useful work visible, but it cannot be edited or applied yet.
    this.state=project===previous.project?{...previous,ready:false,busy:false,loading:!!project,previewPending:false,importing:false,candidateCss:'',previewCandidate:null,diff:[],error:'',message,impact:null,reports:null,check:null}:emptyState(project);
    this.update({project,loading:!!project,message,candidateRevision:this.candidateRevision});
    if(!project)return;
    const ticket=this.begin('load');
    try{
      const result=await this.api(`/api/project?project=${encodeURIComponent(ticket.project)}`);
      if(!this.owns(ticket))return;
      const candidate=result.current.status==='FAIL'?null:result.current.theme;
      this.update({loading:false,ready:true,info:result.info,compatibility:result.preview,current:result.current,candidate,previewPending:!!candidate,error:result.current.status==='FAIL'?result.current.validation.errors.join('; '):''});
    }catch(error){if(this.owns(ticket))this.update({loading:false,ready:false,error:(error as Error).message});}
  }

  setCandidate=(value:Theme|null|((theme:Theme|null)=>Theme|null),message='')=>{
    if(!this.canEdit())return;
    const candidate=typeof value==='function'?value(this.state.candidate):value;
    this.candidateRevision++;
    this.update({candidate,candidateRevision:this.candidateRevision,importing:false,previewCandidate:null,candidateCss:'',diff:[],previewPending:!!candidate,error:'',message});
  };

  async preview(nonce:string){
    if(!this.canEdit()||this.state.importing||!this.state.candidate||!this.state.current)return;
    const ticket=this.begin('preview',true),{candidate,current}=this.state;
    this.update({previewPending:true});
    try{
      const result=await this.api(`/api/theme?project=${encodeURIComponent(ticket.project)}`,this.themeBody(candidate,current),nonce);
      if(this.owns(ticket))this.update({candidateCss:result.css,previewCandidate:result.theme,diff:result.diff,error:'',previewPending:false});
    }catch(error){if(this.owns(ticket))this.update({error:(error as Error).message,candidateCss:'',previewCandidate:null,diff:[],previewPending:false});}
  }

  async apply(nonce:string){
    if(!this.canApply()||!this.state.candidate||!this.state.current)return;
    const ticket=this.begin('apply'),{candidate,current}=this.state;
    this.update({busy:true,error:'',message:''});
    try{
      await this.api(`/api/theme?project=${encodeURIComponent(ticket.project)}`,this.themeBody(candidate,current,true),nonce);
      if(!this.owns(ticket))return;
      await this.load(ticket.project,'主题源与生成 CSS 已应用。实际浏览器效果需要继续核验。');
    }catch(error){if(this.owns(ticket))this.update({error:(error as Error).message});}
    finally{if(this.owns(ticket))this.update({busy:false});}
  }

  async importTheme(file:Pick<File,'text'>,nonce:string){
    if(!this.canEdit()||!this.state.current)return;
    const ticket=this.begin('import',true),current=this.state.current;
    // Import replaces the pending candidate only after the file and validation succeed.
    this.requests.set('preview',(this.requests.get('preview')??0)+1);
    this.update({previewPending:true,importing:true,candidateCss:'',previewCandidate:null,diff:[],error:'',message:''});
    try{
      const imported=JSON.parse(await file.text());
      if(!this.owns(ticket))return;
      const result=await this.api(`/api/theme?project=${encodeURIComponent(ticket.project)}`,this.themeBody(imported.theme??imported,current),nonce);
      if(!this.owns(ticket))return;
      this.candidateRevision++;
      this.update({candidate:result.theme,candidateRevision:this.candidateRevision,candidateCss:result.css,previewCandidate:result.theme,diff:result.diff,previewPending:false,importing:false,message:'已导入并验证候选；差异完成后可应用。'});
    }catch(error){if(this.owns(ticket))this.update({error:`导入失败：${(error as Error).message}`,previewPending:false,importing:false});}
  }

  async queryImpact(token?:string,slot?:string){
    if(!this.state.ready)return;
    const ticket=this.begin('impact');
    try{
      const result=await this.api(`/api/impact?project=${encodeURIComponent(ticket.project)}${token?`&token=${encodeURIComponent(token)}`:''}${slot?`&slot=${encodeURIComponent(slot)}`:''}`);
      if(this.owns(ticket))this.update({impact:result});
    }catch(error){if(this.owns(ticket))this.update({error:(error as Error).message});}
  }

  async checkProject(nonce:string){
    if(!this.state.ready)return;
    const ticket=this.begin('check');
    try{const result=await this.api(`/api/check?project=${encodeURIComponent(ticket.project)}`,{save:true},nonce);if(this.owns(ticket))this.update({check:result});}
    catch(error){if(this.owns(ticket))this.update({error:(error as Error).message});}
  }

  async readReports(){
    if(!this.state.ready)return;
    const ticket=this.begin('reports');
    try{const result=await this.api('/api/reports');if(this.owns(ticket))this.update({reports:result});}
    catch(error){if(this.owns(ticket))this.update({error:(error as Error).message});}
  }
}
