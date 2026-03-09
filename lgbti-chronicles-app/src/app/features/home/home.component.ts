import { Component, signal, computed, inject, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService } from '../../core/services/language.service';
import { PAGE_CONFIG } from '../../core/data/content.data';
import { IntroTabComponent } from './components/intro-tab/intro-tab.component';
import { SecondTabComponent } from './components/second-tab/second-tab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IntroTabComponent, SecondTabComponent],
  template: `
    <div class="home">
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
            <app-intro-tab />
          } @else {
            <app-second-tab />
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home { min-height: 100vh; }
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
  title = computed(() => PAGE_CONFIG.title[this.langService.language()]);
  tabIntroLabel = computed(() => PAGE_CONFIG.tabs.intro[this.langService.language()]);
  tabSecondLabel = computed(() => PAGE_CONFIG.tabs.second[this.langService.language()]);

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.title());
    });
  }

  setTab(tab: 'intro' | 'second'): void {
    this.activeTab.set(tab);
  }
}
