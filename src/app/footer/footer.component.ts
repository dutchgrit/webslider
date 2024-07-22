import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  today: number = new Date().getFullYear();
  showAboutPopup: boolean = false;

  showAbout(event: Event): void {
    event.preventDefault();
    this.showAboutPopup = true;
  }

  closeAbout(): void {
    this.showAboutPopup = false;
  }
}
