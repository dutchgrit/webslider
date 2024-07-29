import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService } from '../slide.service';
import { ISlide } from '../ISlide';

@Component({
  selector: 'app-slide-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-list.component.html',
  styleUrl: './slide-list.component.css'
})
export class SlideListComponent {
  slides: ISlide[] = [];

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.loadSlides();
  }

  loadSlides(): void {
    this.slides = this.slideService.getSlides();
  }
}
