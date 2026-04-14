import { Component, EventEmitter, Input, Output, inject, computed, signal } from '@angular/core';
import { TextParserService, type TextSegment } from '../../../../core/services/text-parser.service';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { LanguageService, type Language } from '../../../../core/services/language.service';
import type { LocalizedModalContent } from '../../../../core/models/content.model';

interface ResolvedModalContent {
  title: string;
  segments: TextSegment[];
}

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [TooltipDirective],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-box" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="close.emit()" aria-label="Close">&times;</button>

        <div class="page-flipper" [class.flipped]="showSpanish()">

          <!-- Front face: original language -->
          <div class="page-face page-front">
            @if (resolvedContent(); as content) {
              @if (content.title) {
                <h2 class="modal-title">{{ content.title }}</h2>
              }
              <div class="modal-body chapter-text">
                @for (seg of content.segments; track $index) {
                  @if (seg.isHighlight) {
                    <span [appTooltip]="seg.tooltip ?? ''" class="highlight">{{ seg.text }}</span>
                  } @else {
                    <span>{{ seg.text }}</span>
                  }
                }
              </div>
            }
            @if (langService.language() !== 'es') {
              <div class="action-bar">
                <button class="flip-btn" (click)="showSpanish.set(true)">
                  <span class="material-icons">translate</span>
                  Ver en español
                  <span class="material-icons arrow-right">chevron_right</span>
                </button>
              </div>
            }
          </div>

          <!-- Back face: Spanish translation -->
          <div class="page-face page-back">
            <div class="lang-badge">
              <span class="material-icons">translate</span>
              Traducción al español
            </div>
            @if (spanishContent(); as es) {
              @if (es.title) {
                <h2 class="modal-title">{{ es.title }}</h2>
              }
              <div class="modal-body chapter-text">
                @for (seg of es.segments; track $index) {
                  @if (seg.isHighlight) {
                    <span [appTooltip]="seg.tooltip ?? ''" class="highlight">{{ seg.text }}</span>
                  } @else {
                    <span>{{ seg.text }}</span>
                  }
                }
              </div>
            }
            <div class="action-bar">
              <button class="flip-btn flip-back" (click)="showSpanish.set(false)">
                <span class="material-icons arrow-left">chevron_left</span>
                {{ backLabel() }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(44, 36, 32, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .modal-box {
      background: transparent;
      border-radius: 4px;
      max-width: min(90vw, var(--reading-width));
      max-height: 80vh;
      overflow: auto;
      position: relative;
      perspective: 1400px;
      perspective-origin: center center;
    }
    .modal-close {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      background: none;
      border: none;
      font-size: 1.75rem;
      cursor: pointer;
      color: var(--color-ink-muted);
      line-height: 1;
      font-family: var(--font-body);
      transition: color 0.2s;
      z-index: 20;
    }
    .modal-close:hover { color: var(--color-ink); }

    /* ── 3-D flipper ── */
    .page-flipper {
      display: grid;
      transform-style: preserve-3d;
      transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .page-flipper.flipped {
      transform: rotateY(-180deg);
    }
    .page-face {
      grid-area: 1 / 1;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      background: var(--color-paper);
      border-radius: 4px;
      padding: var(--space-xl);
      box-shadow: var(--shadow-modal);
      border: 1px solid var(--color-border);
    }
    .page-back {
      transform: rotateY(180deg);
      background: var(--color-paper-warm);
      border-color: var(--color-border-soft);
    }

    /* ── content ── */
    .modal-title {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--color-ink);
      margin: 0 0 var(--space-lg) 0;
      letter-spacing: 0.02em;
    }
    .modal-body.chapter-text {
      padding-right: var(--space-xl);
      font-size: 1.05rem;
      line-height: 1.85;
      color: var(--color-ink);
    }
    .modal-body.chapter-text::first-letter {
      font-family: var(--font-display);
      font-size: 3rem;
      float: left;
      line-height: 1;
      margin-right: 0.35rem;
      margin-top: 0.05rem;
      color: var(--color-ink);
    }
    .highlight {
      background: rgba(139, 105, 20, 0.15);
      padding: 0 0.15em;
      border-bottom: 1px dotted var(--color-accent);
    }

    /* ── action bar ── */
    .action-bar {
      margin-top: var(--space-lg);
      padding-top: var(--space-md);
      border-top: 1px solid var(--color-border-soft);
    }
    .flip-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      background: none;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      padding: 0.45rem 0.9rem;
      font-family: var(--font-body);
      font-size: 0.875rem;
      color: var(--color-ink-muted);
      cursor: pointer;
      transition: all 0.2s;
    }
    .flip-btn .material-icons { font-size: 1.1rem; }
    .flip-btn:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
      background: rgba(139, 105, 20, 0.05);
    }
    .flip-back { color: var(--color-ink-light); }

    /* ── Spanish badge ── */
    .lang-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-body);
      font-size: 0.75rem;
      font-style: italic;
      color: var(--color-ink-light);
      text-transform: uppercase;
      letter-spacing: 0.07em;
      margin-bottom: var(--space-md);
    }
    .lang-badge .material-icons { font-size: 1rem; }
  `]
})
export class ModalContentComponent {
  private parser = inject(TextParserService);
  langService = inject(LanguageService);

  @Input() set content(value: LocalizedModalContent | null) {
    this.localizedContent.set(value);
    this.showSpanish.set(false);
  }
  @Output() close = new EventEmitter<void>();

  private localizedContent = signal<LocalizedModalContent | null>(null);
  showSpanish = signal(false);

  resolvedContent = computed<ResolvedModalContent | null>(() =>
    this.resolve(this.langService.language())
  );

  spanishContent = computed<ResolvedModalContent | null>(() =>
    this.resolve('es')
  );

  backLabel = computed(() =>
    this.langService.language() === 'fr' ? 'Volver al francés' : 'Volver al inglés'
  );

  private resolve(lang: Language): ResolvedModalContent | null {
    const lc = this.localizedContent();
    if (!lc) return null;
    const title = lc.title[lang];
    const rawText = lc.rawText[lang];
    const tooltips: Record<number, string> = {};
    for (const [k, v] of Object.entries(lc.tooltips)) {
      tooltips[Number(k)] = v[lang];
    }
    const segments = this.parser.parseMarkedText(rawText, tooltips);
    return { title, segments };
  }
}
