import { Component } from '@angular/core';
import { TAB2_TEXT } from '../../../../core/data/content.data';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';

@Component({
  selector: 'app-second-tab',
  standalone: true,
  imports: [LanguageToggleComponent],
  template: `
    <div class="second-tab">
      <div class="tab-header">
        <app-language-toggle [disabled]="true" />
      </div>
      <p class="tab-text">{{ tabText }}</p>
    </div>
  `,
  styles: [`
    .second-tab { padding: var(--space-lg) 0; }
    .tab-header { margin-bottom: var(--space-lg); }
    .tab-text {
      font-size: 1.05rem;
      line-height: 1.85;
      max-width: var(--reading-width);
      color: var(--color-ink);
    }
  `]
})
export class SecondTabComponent {
  tabText = TAB2_TEXT;
}
