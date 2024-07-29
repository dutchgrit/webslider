import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService } from '../slide.service';
import { ISlide } from '../ISlide';
import { SafeUrlPipe } from './safe-url.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-slide-list',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, DragDropModule],
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css'],
})
export class SlideListComponent implements OnInit {
  slides: ISlide[] = [];

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
    });
  }

  drop(event: CdkDragDrop<ISlide[]>): void {
    moveItemInArray(this.slides, event.previousIndex, event.currentIndex);
  }
}
