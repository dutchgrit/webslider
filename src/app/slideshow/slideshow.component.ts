import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISlide } from '../ISlide';
import { SlideService } from '../slide.service';
import { SafeUrlPipe } from '../safe-url.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, OnDestroy {
  slides: ISlide[] = [];
  currentSlideIndex: number = 0;
  isSlideshowRunning: boolean = false;
  private slideshowSubscription: Subscription | null = null;

  constructor(private slideService: SlideService) {}

  ngOnInit() {
    this.slides = this.slideService.getSlides();

    this.slideshowSubscription = this.slideService.slideshowRunning$.subscribe((isRunning) => {
      this.isSlideshowRunning = isRunning;
      if (isRunning) {
        this.startSlideShow();
      } else {
        this.stopSlideShow();
      }
    });
  }

  ngOnDestroy() {
    if (this.slideshowSubscription) {
      this.slideshowSubscription.unsubscribe();
    }
    this.slideService.stopSlideShow();
  }

  startSlideShow() {
    this.slideService.startSlideShow((slide) => {
      this.currentSlideIndex = this.slides.findIndex(s => s === slide);
    });
  }

  stopSlideShow() {
    this.slideService.stopSlideShow();
    this.currentSlideIndex = 0;
  }
}
