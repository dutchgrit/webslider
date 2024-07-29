import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISlide } from '../ISlide';
import { SlideService } from '../slide.service';
import { SafeUrlPipe } from '../safe-url.pipe';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css',
})
export class SlideshowComponent implements OnInit, OnDestroy {
  currentSlide: ISlide | null = null;
  isSlideshowRunning: boolean = false;

  constructor(private slideService: SlideService) {}

  ngOnInit() {
    this.slideService.slideshowRunning$.subscribe((isRunning) => {
      this.isSlideshowRunning = isRunning;
      if (isRunning) {
        this.startSlideShow();
      } else {
        this.stopSlideShow();
      }
    });
  }

  ngOnDestroy() {
    this.slideService.stopSlideShow();
  }

  startSlideShow() {
    this.slideService.startSlideShow((slide) => {
      this.currentSlide = slide;
      this.setAnimationClasses(slide.transition);
    });
  }

  stopSlideShow() {
    this.slideService.stopSlideShow();
    this.currentSlide = null;
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
}
