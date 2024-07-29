import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISlide } from './ISlide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private localStorageKey = 'slides';
  private slidesSubject: BehaviorSubject<ISlide[]> = new BehaviorSubject<ISlide[]>([]);
  slides$ = this.slidesSubject.asObservable();

  constructor() {
    this.loadSlidesFromLocalStorage();
  }

  // Load slides from local storage
  private loadSlidesFromLocalStorage(): void {
    const storedSlides = localStorage.getItem(this.localStorageKey);
    if (storedSlides) {
      this.slidesSubject.next(JSON.parse(storedSlides));
    }
  }

  // Save slides to local storage
  private saveSlidesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.slidesSubject.value));
  }

  // Get all slides
  getSlides(): ISlide[] {
    return [...this.slidesSubject.value];
  }

  // Add a new slide
  addSlide(slide: ISlide): void {
    const updatedSlides = [...this.slidesSubject.value, slide];
    this.slidesSubject.next(updatedSlides);
    this.saveSlidesToLocalStorage();
  }

  // Remove a slide by index
  removeSlide(index: number): void {
    const updatedSlides = this.slidesSubject.value.filter((_, i) => i !== index);
    this.slidesSubject.next(updatedSlides);
    this.saveSlidesToLocalStorage();
  }

  // Update a slide by index
  updateSlide(index: number, newSlide: ISlide): void {
    const updatedSlides = this.slidesSubject.value.map((slide, i) => (i === index ? newSlide : slide));
    this.slidesSubject.next(updatedSlides);
    this.saveSlidesToLocalStorage();
  }

  // Replace the entire list of slides
  replaceSlides(newSlides: ISlide[]): void {
    this.slidesSubject.next(newSlides);
    this.saveSlidesToLocalStorage();
  }
}
