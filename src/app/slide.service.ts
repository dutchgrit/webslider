import { Injectable } from '@angular/core';
import { ISlide } from './ISlide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private localStorageKey = 'slides';
  private slides: ISlide[] = [];

  constructor() {
    this.loadSlidesFromLocalStorage();
  }

  // Load slides from local storage
  private loadSlidesFromLocalStorage(): void {
    const storedSlides = localStorage.getItem(this.localStorageKey);
    if (storedSlides) {
      this.slides = JSON.parse(storedSlides);
    }
  }

  // Save slides to local storage
  private saveSlidesToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.slides));
  }

  // Get all slides
  getSlides(): ISlide[] {
    return [...this.slides];
  }

  // Add a new slide
  addSlide(slide: ISlide): void {
    this.slides.push(slide);
    this.saveSlidesToLocalStorage();
  }

  // Remove a slide by index
  removeSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.slides.splice(index, 1);
      this.saveSlidesToLocalStorage();
    }
  }

  // Update a slide by index
  updateSlide(index: number, newSlide: ISlide): void {
    if (index >= 0 && index < this.slides.length) {
      this.slides[index] = newSlide;
      this.saveSlidesToLocalStorage();
    }
  }

  // Replace the entire list of slides
  replaceSlides(newSlides: ISlide[]): void {
    this.slides = [...newSlides];
    this.saveSlidesToLocalStorage();
  }
}
