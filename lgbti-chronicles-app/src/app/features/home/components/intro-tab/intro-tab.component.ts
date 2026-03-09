import { Component, computed, inject, input, output } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { INTRO_TEXT, CARDS_DATA } from '../../../../core/data/content.data';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-intro-tab',
  standalone: true,
  imports: [LanguageToggleComponent, CardComponent],
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
              (select)="cardSelect.emit(selectedCardId() === card.id ? null : card.id)"
            />
          }
        </div>
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
      grid-auto-rows: 1fr;
      gap: var(--space-md);
      margin-bottom: var(--space-xl);
    }
    @media (max-width: 768px) {
      .cards-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class IntroTabComponent {
  private langService = inject(LanguageService);
  cards = CARDS_DATA;
  currentLang = this.langService.language;
  selectedCardId = input.required<number | null>();

  cardSelect = output<number | null>();

  introText = computed(() => {
    const lang = this.langService.language();
    return INTRO_TEXT[lang];
  });

  selectedCard = computed(() => {
    const id = this.selectedCardId();
    return id ? CARDS_DATA.find(c => c.id === id) ?? null : null;
  });
}

