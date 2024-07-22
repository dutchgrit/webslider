import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  @Input() visible: boolean = false;

  close(): void {
    this.visible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.visible && !this.isClickInsidePopup(event)) {
      this.close();
    }
  }

  private isClickInsidePopup(event: MouseEvent): boolean {
    const popupElement = document.querySelector('.content');
    return popupElement ? popupElement.contains(event.target as Node) : false;
  }
}
