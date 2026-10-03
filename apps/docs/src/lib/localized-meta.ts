import type { DocsLocale } from "./paths";
import type { ApiPart, ComponentMeta } from "./types";

/** Parallel content fields, with an independent fallback for each field. */
export interface LocalizedMeta {
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  decisions?: string;
  decisionsEn?: string;
}

type LocalizableMeta = LocalizedMeta & Partial<Pick<ComponentMeta, "api" | "keyboard" | "notes" | "notesEn">>;
type Description = { description: string; descriptionEn?: string };

function hasTranslatedDescription(entry: Description): boolean {
  return Boolean(entry.descriptionEn?.trim()) && entry.descriptionEn !== entry.description;
}

function localizedDescriptions<T extends Description>(entries: T[]): T[] {
  if (!entries.some(hasTranslatedDescription)) return entries;
  return entries.map((entry) => entry.descriptionEn?.trim() && entry.descriptionEn !== entry.description
    ? { ...entry, description: entry.descriptionEn }
    : entry);
}

function localizedApi(parts: ApiPart[]): ApiPart[] {
  if (!parts.some((part) => hasTranslatedDescription(part) || part.props?.some(hasTranslatedDescription))) return parts;
  return parts.map((part) => {
    const props = part.props ? localizedDescriptions(part.props) : undefined;
    if (!hasTranslatedDescription(part) && props === part.props) return part;
    return {
      ...part,
      ...(part.descriptionEn?.trim() ? { description: part.descriptionEn } : {}),
      ...(props ? { props } : {}),
    };
  });
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
    ...(meta.keyboard ? { keyboard: localizedDescriptions(meta.keyboard) } : {}),
    ...(meta.notes && meta.notesEn ? {
      notes: meta.notes.map((note, index) => {
        const translated = meta.notesEn?.[index];
        return translated?.trim() ? translated : note;
      }),
    } : {}),
  };
}
