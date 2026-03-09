import { Component, Input, inject } from '@angular/core';
import { LanguageService, type Language } from '../../../../core/services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: `
    <div class="toggle">
      @for (lang of languages; track lang) {
        <button
          class="lang-btn"
          [class.active]="isActive(lang)"
          [class.opaque]="isOpaque(lang)"
          [disabled]="disabled || fixedLanguage !== null"
          (click)="!disabled && !fixedLanguage && setLang(lang)"
        >
          {{ labels[lang] }}
        </button>
      }
    </div>
  `,
  styles: [`
    .toggle { display: flex; gap: var(--space-xs); }
    .lang-btn {
      padding: var(--space-xs) var(--space-sm);
      border: 1px solid var(--color-border);
      background: var(--color-paper);
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--font-body);
      font-size: 0.85rem;
      color: var(--color-ink-muted);
      transition: all 0.2s;
    }
    .lang-btn:hover:not(:disabled) {
      background: var(--color-paper-warm);
      color: var(--color-ink);
      border-color: var(--color-ink-light);
    }
    .lang-btn.active {
      background: var(--color-ink);
      color: var(--color-paper);
      border-color: var(--color-ink);
    }
    .lang-btn.opaque {
      opacity: 0.5;
    }
  `]
})
export class LanguageToggleComponent {
  private langService = inject(LanguageService);
  @Input() disabled = false;
  /** When set, shows this language as active and others as opaque (e.g. second tab) */
  @Input() fixedLanguage: Language | null = null;

  languages: Language[] = ['es', 'fr', 'en'];
  labels: Record<Language, string> = {
    es: 'Español',
    fr: 'Français',
    en: 'English'
  };

  currentLang = this.langService.language;

  isActive(lang: Language): boolean {
    if (this.fixedLanguage) return lang === this.fixedLanguage;
    return !this.disabled && this.currentLang() === lang;
  }

  isOpaque(lang: Language): boolean {
    return this.fixedLanguage !== null && lang !== this.fixedLanguage;
  }

  setLang(lang: Language): void {
    this.langService.setLanguage(lang);
  }
}
