import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();

  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
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
