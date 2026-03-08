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
    .toggle { display: flex; gap: 8px; }
    .lang-btn {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    .lang-btn:hover:not(:disabled) { background: #f5f5f5; }
    .lang-btn.active { background: #4a90d9; color: white; border-color: #4a90d9; }
    .lang-btn:disabled { cursor: default; opacity: 0.9; }
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
