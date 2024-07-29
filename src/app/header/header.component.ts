import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { SlideService } from '../slide.service';
import { ISlide } from '../ISlide';
import { SafeUrlPipe } from '../safe-url.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, SafeUrlPipe, PopupComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../button.css'],
})
export class HeaderComponent {
  showForm: boolean = false;
  newSlide: ISlide = { url: '', slideTime: 0, transition: 'fade' };
  currentSlide: ISlide | null = null;
  isSlideshowRunning: boolean = false;
  slideIndex: number = 0;

  constructor(private slideService: SlideService) {}

  onSubmit() {
    this.slideService.addSlide(this.newSlide);
    this.newSlide = { url: '', slideTime: 0, transition: 'fade' };
    this.showForm = false;
  }

  startSlideShow() {
    if (this.isSlideshowRunning) {
      this.slideService.stopSlideShow();
      this.isSlideshowRunning = false;
      this.currentSlide = null;
      this.slideIndex = 0;
    } else {
      this.isSlideshowRunning = true;
      this.showNextSlide();
    }
  }

  showNextSlide() {
    const slides = this.slideService.getSlides();
    if (slides.length === 0) return;

    this.currentSlide = slides[this.slideIndex];
    this.setAnimationClasses(this.currentSlide.transition);

    setTimeout(() => {
      if (this.isSlideshowRunning && this.currentSlide) {
        this.slideIndex = (this.slideIndex + 1) % slides.length;
        this.showNextSlide();
      }
    }, (this.currentSlide?.slideTime || 0) * 1000);
  }

  setAnimationClasses(transition: string) {
    const slideElement = document.querySelector('.slide');
    if (slideElement && this.currentSlide) {
      slideElement.classList.remove(
        'fade-in',
        'fade-out',
        'slide-in',
        'slide-out'
      );

      switch (transition) {
        case 'fade':
          slideElement.classList.add('fade-in');
          setTimeout(() => {
            slideElement.classList.add('fade-out');
          }, (this.currentSlide?.slideTime || 1) * 1000 - 1000); // fade out 1s before the slide ends
          break;
        case 'slide':
          slideElement.classList.add('slide-in');
          setTimeout(() => {
            slideElement.classList.add('slide-out');
          }, (this.currentSlide?.slideTime || 1) * 1000 - 1000); // slide out 1s before the slide ends
          break;
        default:
          slideElement.classList.add('fade-in');
          setTimeout(() => {
            slideElement.classList.add('fade-out');
          }, (this.currentSlide?.slideTime || 1) * 1000 - 1000);
      }
    }
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
