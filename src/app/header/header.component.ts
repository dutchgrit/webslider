import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ISlide } from '../ISlide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showSettings: boolean = false;
  showForm: boolean = false;

  startSlideShow() {
    // Implement start slideshow functionality
    throw new Error('Method not implemented.');
  }

  downloadSlides() {
    // Implement download slides functionality
    throw new Error('Method not implemented.');
  }

  importSlides(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Implement file import functionality
      console.log('File selected:', file.name);
    }
  }

  deleteSlides() {
    // Implement delete slides functionality
    throw new Error('Method not implemented.');
  }
}
