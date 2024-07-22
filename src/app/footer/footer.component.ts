import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  today: number = new Date().getFullYear();
  showAboutPopup: boolean = false;

  showAbout(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.showAboutPopup = true;
  }

  closeAbout(): void {
    this.showAboutPopup = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showAboutPopup && !this.isClickInsidePopup(event)) {
      this.closeAbout();
    }
  }

  private isClickInsidePopup(event: MouseEvent): boolean {
    const popupElement = document.querySelector('.popup-content');
    return popupElement ? popupElement.contains(event.target as Node) : false;
  }
}
