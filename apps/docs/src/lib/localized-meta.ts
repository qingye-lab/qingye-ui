import type { DocsLocale } from "./paths";
import type { ApiPart, ApiProp, ComponentDesign, ComponentDesignTranslation, ComponentMeta, KeyboardRow } from "./types";

/** Parallel content fields, with an independent fallback for each field. */
export interface LocalizedMeta {
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  decisions?: string;
  decisionsEn?: string;
}

type LocalizableMeta = LocalizedMeta & Partial<Pick<ComponentMeta, "api" | "keyboard" | "notes" | "notesEn" | "design" | "designEn">>;
type Description = { description: string; descriptionEn?: string };

function hasTranslatedDescription(entry: Description): boolean {
  return Boolean(entry.descriptionEn?.trim()) && entry.descriptionEn !== entry.description;
}

function hasTranslatedProp(prop: ApiProp): boolean {
  return hasTranslatedDescription(prop) || Boolean(prop.nameEn?.trim() || prop.typeEn?.trim() || prop.defaultEn?.trim());
}

function localizedApi(parts: ApiPart[]): ApiPart[] {
  if (!parts.some((part) => hasTranslatedDescription(part) || part.props?.some(hasTranslatedProp))) return parts;
  return parts.map((part) => {
    const props = part.props?.some(hasTranslatedProp) ? part.props.map(prop => hasTranslatedProp(prop) ? {
      ...prop,
      ...(prop.descriptionEn?.trim() ? { description: prop.descriptionEn } : {}),
      ...(prop.nameEn?.trim() ? { name: prop.nameEn } : {}),
      ...(prop.typeEn?.trim() ? { type: prop.typeEn } : {}),
      ...(prop.defaultEn?.trim() ? { default: prop.defaultEn } : {}),
    } : prop) : part.props;
    if (!hasTranslatedDescription(part) && props === part.props) return part;
    return {
      ...part,
      ...(part.descriptionEn?.trim() ? { description: part.descriptionEn } : {}),
      ...(props ? { props } : {}),
    };
  });
}

function localizedKeyboard(rows: KeyboardRow[]): KeyboardRow[] {
  if (!rows.some(row => hasTranslatedDescription(row) || row.keysEn?.trim())) return rows;
  return rows.map(row => hasTranslatedDescription(row) || row.keysEn?.trim() ? {
    ...row,
    ...(row.descriptionEn?.trim() ? { description: row.descriptionEn } : {}),
    ...(row.keysEn?.trim() ? { keys: row.keysEn } : {}),
  } : row);
}

function translatedArray(source: string[], translation: string[] | undefined): string[] {
  if (!translation?.some(entry => entry?.trim())) return source;
  return source.map((entry, index) => translation[index]?.trim() ? translation[index]! : entry);
}

/** Translate only authored sections, keeping unrelated and missing sections intact. */
export function localizedDesign(source: Partial<ComponentDesign>, translation: ComponentDesignTranslation | undefined): Partial<ComponentDesign> {
  if (!translation) return source;
  const result = { ...source };
  for (const key of ["whenToUse", "avoid", "composition", "responsive", "customization"] as const) {
    const entries = source[key];
    if (entries) result[key] = translatedArray(entries, translation[key]);
  }
  if (source.stateOwner) result.stateOwner = {
    library: translatedArray(source.stateOwner.library, translation.stateOwner?.library),
    application: translatedArray(source.stateOwner.application, translation.stateOwner?.application),
  };
  return result;
}

/**
 * Select English per field; missing or blank translations keep the source.
 * notesEn is a parallel array paired with notes by index: missing, blank, or
 * short entries fall back to that Chinese note. Never filter or shift entries;
 * the projected notes always have notes.length entries. Extra English entries
 * are ignored. Chinese returns the source object unchanged.
 */
export function localizedMeta<T extends LocalizableMeta>(meta: T, locale: DocsLocale): T {
  if (locale === "zh") return meta;
  return {
    ...meta,
    title: meta.titleEn?.trim() ? meta.titleEn : meta.title,
    ...(meta.descriptionEn?.trim() ? { description: meta.descriptionEn } : {}),
    ...(meta.decisionsEn?.trim() ? { decisions: meta.decisionsEn } : {}),
    ...(meta.api ? { api: localizedApi(meta.api) } : {}),
    ...(meta.keyboard ? { keyboard: localizedKeyboard(meta.keyboard) } : {}),
    ...(meta.design ? { design: localizedDesign(meta.design, meta.designEn) } : {}),
    ...(meta.notes && meta.notesEn ? {
      notes: meta.notes.map((note, index) => {
        const translated = meta.notesEn?.[index];
        return translated?.trim() ? translated : note;
      }),
    } : {}),
  };
}
