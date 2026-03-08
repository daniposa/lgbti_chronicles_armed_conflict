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

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  modalContent: ModalContent;
}

export interface CardData {
  id: number;
  title: LocalizedContent;
  description: LocalizedContent;
  imagePath: string;
  hotspots: Hotspot[];
}
