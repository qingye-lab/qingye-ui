export type Theme={schemaVersion:1;brand:string;common:Record<string,string>;light:Record<string,string>;dark:Record<string,string>;compact:Record<string,string>};
export type FrameSettings={theme:Theme;css:string;scheme:'light'|'dark';density:'default'|'compact';mode:'class'|'data-theme';inspect:boolean};
export const libraryTheme:Theme={schemaVersion:1,brand:'qingye',common:{},light:{},dark:{},compact:{}};
export const azure:Theme={schemaVersion:1,brand:'azure',common:{},light:{'--qy-primary':'#174c83','--qy-primary-foreground':'#ffffff'},dark:{'--qy-primary':'#93c5fd','--qy-primary-foreground':'#101827'},compact:{}};
export const amber:Theme={schemaVersion:1,brand:'amber',common:{},light:{'--qy-primary':'#774517','--qy-primary-foreground':'#ffffff'},dark:{'--qy-primary':'#f3c58b','--qy-primary-foreground':'#261809'},compact:{}};
