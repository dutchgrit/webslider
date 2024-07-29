import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISlide } from './ISlide';

@Injectable({
  providedIn: 'root',
})
export class SlideService {
  private localStorageKey = 'slides';
  private slidesSubject: BehaviorSubject<ISlide[]> = new BehaviorSubject<
    ISlide[]
  >([]);
  slides$ = this.slidesSubject.asObservable();
  private currentSlideIndex = 0;
  private slideInterval: any;
  private slideshowRunningSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  slideshowRunning$ = this.slideshowRunningSubject.asObservable();

  constructor() {
    this.loadSlidesFromLocalStorage();
  }

  private loadSlidesFromLocalStorage(): void {
    const storedSlides = localStorage.getItem(this.localStorageKey);
    if (storedSlides) {
      this.slidesSubject.next(JSON.parse(storedSlides));
    }
  }

  private saveSlidesToLocalStorage(): void {
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.slidesSubject.value)
    );
  }

  getSlides(): ISlide[] {
    return [...this.slidesSubject.value];
  }

  addSlide(slide: ISlide): void {
    const updatedSlides = [...this.slidesSubject.value, slide];
    this.slidesSubject.next(updatedSlides);
    this.saveSlidesToLocalStorage();
  }

  removeSlide(index: number): void {
    const updatedSlides = this.slidesSubject.value.filter(
      (_, i) => i !== index
    );
    this.slidesSubject.next(updatedSlides);
    this.saveSlidesToLocalStorage();
  }

  updateSlide(index: number, newSlide: ISlide): void {
    const updatedSlides = this.slidesSubject.value.map((slide, i) =>
      i === index ? newSlide : slide
    );
    this.slidesSubject.next(updatedSlides);
    this.saveSlidesToLocalStorage();
  }

  replaceSlides(newSlides: ISlide[]): void {
    this.slidesSubject.next(newSlides);
    this.saveSlidesToLocalStorage();
  }

  startSlideShow(callback: (slide: ISlide) => void): void {
    const slides = this.slidesSubject.value;
    if (slides.length === 0) return;

    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }

    this.slideshowRunningSubject.next(true);
    this.currentSlideIndex = 0;
    callback(slides[this.currentSlideIndex]);

    this.slideInterval = setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % slides.length;
      callback(slides[this.currentSlideIndex]);
    }, slides[this.currentSlideIndex].slideTime * 1000);
  }

  stopSlideShow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
    this.slideshowRunningSubject.next(false);
  }

  isSlideshowRunning(): boolean {
    return this.slideshowRunningSubject.value;
  }
}
