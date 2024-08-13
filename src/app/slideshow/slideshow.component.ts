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
  private slidesSubscription: Subscription | null = null;
  private slideshowRunningSubscription: Subscription | null = null;

  constructor(private slideService: SlideService) {}

  ngOnInit() {
    this.slidesSubscription = this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
      if (this.slides.length > 0 && !this.isSlideshowRunning) {
        this.startSlideShow();
      }
    });

    this.slideshowRunningSubscription =
      this.slideService.slideshowRunning$.subscribe((isRunning) => {
        this.isSlideshowRunning = isRunning;
      });
  }

  ngOnDestroy() {
    if (this.slidesSubscription) {
      this.slidesSubscription.unsubscribe();
    }
    if (this.slideshowRunningSubscription) {
      this.slideshowRunningSubscription.unsubscribe();
    }
    this.slideService.stopSlideShow();
  }

  updateSlide(slide: ISlide) {
    this.currentSlideIndex = this.slides.findIndex((s) => s === slide);
  }

  startSlideShow() {
    if (!this.isSlideshowRunning) {
      this.slideService.startSlideShow(this.updateSlide.bind(this));
    }
  }

  stopSlideShow() {
    this.slideService.stopSlideShow();
    this.currentSlideIndex = 0;
  }
}
