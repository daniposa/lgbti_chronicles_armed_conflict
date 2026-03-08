import { Injectable, signal, computed } from '@angular/core';

export type Language = 'es' | 'fr' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly currentLanguage = signal<Language>('es');

  readonly language = this.currentLanguage.asReadonly();
  readonly language$ = computed(() => this.currentLanguage());

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
  }
}
