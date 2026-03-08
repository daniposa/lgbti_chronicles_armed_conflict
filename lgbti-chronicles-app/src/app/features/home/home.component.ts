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
      padding: 24px;
      border-bottom: 1px solid #eee;
      background: #fafafa;
    }
    .header h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 600;
    }
    .tabs { padding: 0 24px 48px; }
    .tab-buttons {
      display: flex;
      gap: 8px;
      margin-top: 20px;
      border-bottom: 2px solid #eee;
    }
    .tab-btn {
      padding: 12px 24px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1rem;
      color: #666;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
    }
    .tab-btn:hover { color: #333; }
    .tab-btn.active {
      color: #4a90d9;
      border-bottom-color: #4a90d9;
      font-weight: 500;
    }
    .tab-content { margin-top: 24px; }
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
