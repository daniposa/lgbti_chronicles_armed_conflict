import type { Language } from '../services/language.service';

export interface LocalizedContent {
  es: string;
  fr: string;
  en: string;
}

export interface ModalContent {
  title: string;
  rawText: string;
  tooltips: Record<number, string>;
}

export interface LocalizedModalContent {
  title: LocalizedContent;
  rawText: LocalizedContent;
  tooltips: Record<number, LocalizedContent>;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  modalContent: LocalizedModalContent;
}

export interface CardData {
  id: number;
  title: LocalizedContent;
  description: LocalizedContent;
  imagePath: string;
  hotspots: Hotspot[];
}
