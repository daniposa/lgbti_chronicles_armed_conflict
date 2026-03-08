import { Component, signal, computed } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { PROJECT_TITLE } from '../../core/data/content.data';
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
            Introducción
          </button>
          <button
            class="tab-btn"
            [class.active]="activeTab() === 'second'"
            (click)="setTab('second')"
          >
            Segundo Tab
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
  activeTab = signal<'intro' | 'second'>('intro');
  title = computed(() => PROJECT_TITLE[this.langService.language()]);

  constructor(private langService: LanguageService) {}

  setTab(tab: 'intro' | 'second'): void {
    this.activeTab.set(tab);
  }
}
