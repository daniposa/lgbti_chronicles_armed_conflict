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
    .intro-tab { padding: 24px 0; }
    .intro-header { margin-bottom: 20px; }
    .intro-text {
      margin-bottom: 48px;
      line-height: 1.7;
      max-width: 800px;
    }
    .cards-section { margin-top: 32px; }
    .cards-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .image-wrapper { margin-top: 24px; }
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

