import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlideService } from '../slide.service';
import { PopupComponent } from '../popup/popup.component';
import { ISlide } from '../ISlide';
import { SafeUrlPipe } from './safe-url.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-slide-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SafeUrlPipe,
    DragDropModule,
    PopupComponent,
  ],
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css'],
})
export class SlideListComponent implements OnInit {
  slides: ISlide[] = [];
  showForm: boolean = false;
  editIndex: number | null = null;
  newSlide: ISlide = { url: '', slideTime: 0, transition: 'fade' };

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.slideService.slides$.subscribe((slides) => {
      this.slides = slides;
    });
  }

  drop(event: CdkDragDrop<ISlide[]>): void {
    moveItemInArray(this.slides, event.previousIndex, event.currentIndex);
  }

  editSlide(index: number): void {
    this.newSlide = { ...this.slides[index] };
    this.editIndex = index;
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.editIndex !== null) {
      this.slides[this.editIndex] = { ...this.newSlide };
    } else {
      this.slides.push({ ...this.newSlide });
    }
    this.showForm = false;
    this.newSlide = { url: '', slideTime: 0, transition: 'fade' };
    this.editIndex = null;
  }
}
