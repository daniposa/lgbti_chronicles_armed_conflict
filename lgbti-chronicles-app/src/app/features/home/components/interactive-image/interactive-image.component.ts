import { Component, Input } from '@angular/core';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import type { CardData, Hotspot } from '../../../../core/models/content.model';

@Component({
  selector: 'app-interactive-image',
  standalone: true,
  imports: [ModalContentComponent],
  template: `
    <div class="image-container">
      <img [src]="imagePath" [alt]="'Image for card ' + card?.id" />
      @for (h of hotspots; track h.id) {
        <div
          class="hotspot"
          [style.left.%]="h.x"
          [style.top.%]="h.y"
          [style.width.%]="h.width"
          [style.height.%]="h.height"
          (click)="openModal(h)"
        ></div>
      }
    </div>
    @if (modalContent) {
      <app-modal-content [content]="modalContent" (close)="closeModal()" />
    }
  `,
  styles: [`
    .image-container {
      position: relative;
      display: inline-block;
      max-width: 100%;
    }
    .image-container img {
      display: block;
      max-width: 100%;
      height: auto;
    }
    .hotspot {
      position: absolute;
      cursor: pointer;
      background: rgba(100, 150, 255, 0.2);
      transition: background 0.2s;
    }
    .hotspot:hover {
      background: rgba(100, 150, 255, 0.4);
    }
  `]
})
export class InteractiveImageComponent {
  @Input() card: CardData | null = null;

  get imagePath(): string {
    return this.card?.imagePath ?? '';
  }

  get hotspots(): Hotspot[] {
    return this.card?.hotspots ?? [];
  }

  modalContent: import('../../../../core/models/content.model').ModalContent | null = null;

  openModal(hotspot: Hotspot): void {
    this.modalContent = hotspot.modalContent;
  }

  closeModal(): void {
    this.modalContent = null;
  }
}
