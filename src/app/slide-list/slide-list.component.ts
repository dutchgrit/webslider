import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService } from '../slide.service';
import { ISlide } from '../ISlide';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-slide-list',
  standalone: true,
  imports: [ CommonModule, SafeUrlPipe ],
  templateUrl: './slide-list.component.html',
  styleUrl: './slide-list.component.css'
})
export class SlideListComponent implements OnInit {
  slides: ISlide[] = [];

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
    });
  }
}
