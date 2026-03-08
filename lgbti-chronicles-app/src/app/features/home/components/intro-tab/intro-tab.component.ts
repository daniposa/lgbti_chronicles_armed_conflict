import { Component, signal, computed, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { INTRO_TEXT, CARDS_DATA } from '../../../../core/data/content.data';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { CardComponent } from '../card/card.component';
import { InteractiveImageComponent } from '../interactive-image/interactive-image.component';

@Component({
  selector: 'app-intro-tab',
  standalone: true,
  imports: [LanguageToggleComponent, CardComponent, InteractiveImageComponent],
  template: `
    <div class="intro-tab">
      <div class="intro-header">
        <app-language-toggle />
      </div>
      <p class="intro-text">{{ introText() }}</p>
      <div class="cards-section">
        <div class="cards-row">
          @for (card of cards; track card.id) {
            <app-card
              [card]="card"
              [lang]="currentLang()"
              [selected]="selectedCardId() === card.id"
              (select)="selectCard(card.id)"
            />
          }
        </div>
        @if (selectedCard()) {
          <div class="image-wrapper">
            <app-interactive-image [card]="selectedCard()" />
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .intro-tab { padding: var(--space-lg) 0; }
    .intro-header { margin-bottom: var(--space-lg); }
    .intro-text {
      margin-bottom: var(--space-2xl);
      font-size: 1.05rem;
      line-height: 1.85;
      max-width: var(--reading-width);
      color: var(--color-ink);
      font-style: normal;
    }
    .intro-text::first-letter {
      font-family: var(--font-display);
      font-size: 3rem;
      float: left;
      line-height: 1;
      margin-right: 0.35rem;
      margin-top: 0.05rem;
      color: var(--color-ink);
    }
    .cards-section { margin-top: var(--space-2xl); }
    .cards-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
      margin-bottom: var(--space-xl);
    }
    @media (max-width: 768px) {
      .cards-row {
        grid-template-columns: 1fr;
      }
    }
    .image-wrapper {
      margin-top: var(--space-xl);
      padding: var(--space-md);
      background: var(--color-paper-warm);
      border-radius: 4px;
      border: 1px solid var(--color-border-soft);
      box-shadow: var(--shadow-soft);
    }
  `]
})
export class IntroTabComponent {
  private langService = inject(LanguageService);
  cards = CARDS_DATA;
  currentLang = this.langService.language;
  selectedCardId = signal<number | null>(null);

  introText = computed(() => {
    const lang = this.langService.language();
    return INTRO_TEXT[lang];
  });

  selectedCard = computed(() => {
    const id = this.selectedCardId();
    return id ? CARDS_DATA.find(c => c.id === id) ?? null : null;
  });

  selectCard(id: number): void {
    this.selectedCardId.set(this.selectedCardId() === id ? null : id);
  }
}

