import { TestBed } from '@angular/core/testing';
import { SlideService } from './slide.service';
import { ISlide } from './ISlide';

describe('SlideService', () => {
  let service: SlideService;
  let testSlides: ISlide[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideService);

    testSlides = [
      { url: 'http://example.com/1', slideTime: 5, transition: 'fade' },
      { url: 'http://example.com/2', slideTime: 10, transition: 'slide' }
    ];

    // Clear local storage and initialize it with test slides
    localStorage.removeItem('slides');
    localStorage.setItem('slides', JSON.stringify(testSlides));
  });

  afterEach(() => {
    // Clear local storage after each test
    localStorage.removeItem('slides');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should replace all slides', () => {
    const newSlides: ISlide[] = [
      { url: 'http://example.com/a', slideTime: 5, transition: 'fade' },
      { url: 'http://example.com/b', slideTime: 10, transition: 'slide' }
    ];
    service.replaceSlides(newSlides);
    const slides = service.getSlides();
    expect(slides).toEqual(newSlides);
  });
});
