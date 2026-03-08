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
          [class.active]="!disabled && currentLang() === lang"
          [disabled]="disabled"
          (click)="!disabled && setLang(lang)"
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
    .lang-btn:disabled { cursor: default; opacity: 0.7; }
  `]
})
export class LanguageToggleComponent {
  private langService = inject(LanguageService);
  @Input() disabled = false;

  languages: Language[] = ['es', 'fr', 'en'];
  labels: Record<Language, string> = {
    es: 'Español',
    fr: 'Français',
    en: 'English'
  };

  currentLang = this.langService.language;

  setLang(lang: Language): void {
    this.langService.setLanguage(lang);
  }
}
