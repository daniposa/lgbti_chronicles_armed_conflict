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
      [style.min-height.px]="card?.placement?.height"
      [style.--card-bg-alpha]="card?.backgroundAlpha ?? 0.28"
      (click)="select.emit()"
    >
      <h3
        [style.font-family]="card?.textStyle?.fontFamily"
        [style.font-size]="card?.textStyle?.fontSize"
        [style.color]="card?.textStyle?.color"
      >
        {{ card?.title?.[lang] ?? '' }}
      </h3>
    </div>
  `,
  styles: [
    `
      .card {
        padding: 0.25rem 2.5%;
        border: 2px solid #ffe033;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.25s ease;
        min-height: 140px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        /* Semi-transparent so the background illustration shows through.
           Alpha is configurable per card via the --card-bg-alpha property. */
        background: rgba(248, 244, 239, var(--card-bg-alpha, 0.28));
        /* Yellow neon glow (same color as the glow icons). */
        box-shadow:
          0 0 6px rgba(255, 220, 0, 0.9),
          0 0 14px rgba(255, 220, 0, 0.6),
          inset 0 0 6px rgba(255, 220, 0, 0.3);
      }
      .card:hover {
        border-color: #fff176;
        background: rgba(248, 244, 239, calc(var(--card-bg-alpha, 0.28) + 0.1));
        box-shadow:
          0 0 10px rgba(255, 220, 0, 1),
          0 0 22px rgba(255, 220, 0, 0.8),
          inset 0 0 10px rgba(255, 220, 0, 0.4);
      }
      .card.selected {
        border-color: #fff176;
        background: rgba(248, 244, 239, calc(var(--card-bg-alpha, 0.28) + 0.1));
        box-shadow:
          0 0 12px rgba(255, 220, 0, 1),
          0 0 26px rgba(255, 220, 0, 0.85),
          inset 0 0 10px rgba(255, 220, 0, 0.45);
      }
      .card h3 {
        margin: 0;
        width: 100%;
        text-align: center;
        font-family: var(--font-display);
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--color-ink);
      }
      .card p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-ink-muted);
        line-height: 1.5;
      }
    `,
  ],
})
export class CardComponent {
  @Input() card: CardData | null = null;
  @Input() lang: Language = 'es';
  @Input() selected = false;
  @Output() select = new EventEmitter<void>();
}
