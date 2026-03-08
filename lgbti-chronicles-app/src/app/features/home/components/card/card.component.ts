import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { CardData } from '../../../../core/models/content.model';
import type { Language } from '../../../../core/services/language.service';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="card"
      [class.selected]="selected"
      (click)="select.emit()"
    >
      <h3>{{ card?.title?.[lang] ?? '' }}</h3>
      <p>{{ card?.description?.[lang] ?? '' }}</p>
    </div>
  `,
  styles: [`
    .card {
      padding: 20px;
      border: 2px solid #ddd;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
      min-width: 180px;
    }
    .card:hover {
      border-color: #999;
      background: #f9f9f9;
    }
    .card.selected {
      border-color: #4a90d9;
      background: #e8f4fc;
    }
    .card h3 { margin: 0 0 8px 0; font-size: 1.1rem; }
    .card p { margin: 0; font-size: 0.9rem; color: #555; }
  `]
})
export class CardComponent {
  @Input() card: CardData | null = null;
  @Input() lang: Language = 'es';
  @Input() selected = false;
  @Output() select = new EventEmitter<void>();
}
