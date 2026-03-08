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
    .second-tab { padding: 24px 0; }
    .tab-header { margin-bottom: 20px; }
    .tab-text { line-height: 1.7; max-width: 800px; }
  `]
})
export class SecondTabComponent {
  tabText = TAB2_TEXT;
}
