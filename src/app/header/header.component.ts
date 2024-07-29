import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { SlideService } from '../slide.service';
import { ISlide } from '../ISlide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ PopupComponent, FormsModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showForm: boolean = false;
  newSlide: ISlide = { url: '', slideTime: 0, transition: 'fade' };

  constructor(private slideService: SlideService) {}

  onSubmit() {
    this.slideService.addSlide(this.newSlide);
    this.newSlide = { url: '', slideTime: 0, transition: 'fade' }; // Reset the form
    this.showForm = false; // Close the form popup
  }

  startSlideShow() {
    // Implement start slideshow functionality
    throw new Error('Method not implemented.');
  }

  downloadSlides() {
    const slides = this.slideService.getSlides();
    const slidesJson = JSON.stringify(slides, null, 2);
    const blob = new Blob([slidesJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slides.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importSlides(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const slides: ISlide[] = JSON.parse(e.target.result);
          this.slideService.replaceSlides(slides);
          console.log('Slides imported successfully:', slides);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  deleteSlides() {
    this.slideService.replaceSlides([]);
  }
}
