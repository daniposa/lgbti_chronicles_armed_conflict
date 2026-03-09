import { Component, signal, computed, inject, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../../core/services/language.service';
import { PAGE_CONFIG } from '../../core/data/content.data';
import { IntroTabComponent } from './components/intro-tab/intro-tab.component';
import { SecondTabComponent } from './components/second-tab/second-tab.component';

const BACKGROUND_IMAGES = {
  intro: 'images/background_1.jpg',
  second: 'images/background_2.jpg',
  card: 'images/background_3.jpg'
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IntroTabComponent, SecondTabComponent],
  template: `
    <div class="home" [style.backgroundImage]="backgroundImage()">
      <header class="header">
        <h1>{{ title() }}</h1>
      </header>
      <div class="tabs">
        <div class="tab-buttons">
          <button
            class="tab-btn"
            [class.active]="activeTab() === 'intro'"
            (click)="setTab('intro')"
          >
            {{ tabIntroLabel() }}
          </button>
          <button
            class="tab-btn"
            [class.active]="activeTab() === 'second'"
            (click)="setTab('second')"
          >
            {{ tabSecondLabel() }}
          </button>
        </div>
        <div class="tab-content">
          @if (activeTab() === 'intro') {
            <app-intro-tab
              [selectedCardId]="selectedCardId()"
              (cardSelect)="onCardSelect($event)"
            />
          } @else {
            <app-second-tab />
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
      background-color: var(--color-paper);
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      transition: background-image 0.4s ease;
    }
    .home::before {
      content: '';
      position: fixed;
      inset: 0;
      background: linear-gradient(to bottom, rgba(248,244,239,0.75) 0%, rgba(248,244,239,0.9) 100%);
      pointer-events: none;
      z-index: 0;
    }
    .home > * { position: relative; z-index: 1; }
    .header {
      padding: var(--space-lg) var(--space-xl);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-paper-warm);
    }
    .header h1 {
      margin: 0;
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      color: var(--color-ink);
    }
    .tabs {
      padding: 0 var(--space-xl) var(--space-2xl);
      max-width: var(--content-max);
      margin: 0 auto;
    }
    .tab-buttons {
      display: flex;
      gap: var(--space-xs);
      margin-top: var(--space-lg);
      border-bottom: 1px solid var(--color-border);
    }
    .tab-btn {
      padding: var(--space-sm) var(--space-md);
      border: none;
      background: none;
      cursor: pointer;
      font-family: var(--font-body);
      font-size: 0.95rem;
      color: var(--color-ink-muted);
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: color 0.2s, border-color 0.2s;
    }
    .tab-btn:hover { color: var(--color-ink); }
    .tab-btn.active {
      color: var(--color-ink);
      border-bottom-color: var(--color-accent);
      font-weight: 500;
    }
    .tab-content { margin-top: var(--space-xl); }
  `]
})
export class HomeComponent {
  private langService = inject(LanguageService);
  private titleService = inject(Title);
  activeTab = signal<'intro' | 'second'>('intro');
  selectedCardId = signal<number | null>(null);
  title = computed(() => PAGE_CONFIG.title[this.langService.language()]);
  tabIntroLabel = computed(() => PAGE_CONFIG.tabs.intro[this.langService.language()]);
  tabSecondLabel = computed(() => PAGE_CONFIG.tabs.second[this.langService.language()]);

  backgroundImage = computed(() => {
    const tab = this.activeTab();
    const cardId = this.selectedCardId();
    if (tab === 'second') return `url(${BACKGROUND_IMAGES.second})`;
    if (tab === 'intro' && cardId !== null) return `url(${BACKGROUND_IMAGES.card})`;
    return `url(${BACKGROUND_IMAGES.intro})`;
  });

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.title());
    });
  }

  setTab(tab: 'intro' | 'second'): void {
    this.activeTab.set(tab);
    if (tab === 'second') this.selectedCardId.set(null);
  }

  onCardSelect(cardId: number | null): void {
    this.selectedCardId.set(cardId);
  }
}
