import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlideService } from '../slide.service';
import { PopupComponent } from '../popup/popup.component';
import { AboutComponent } from '../about/about.component';
import { ISlide } from '../ISlide';
import { SafeUrlPipe } from '../safe-url.pipe';
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
    AboutComponent,
  ],
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css', '../button.css'],
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
    this.slideService.replaceSlides(this.slides);
  }

  editSlide(index: number): void {
    this.newSlide = { ...this.slides[index] };
    this.editIndex = index;
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.editIndex !== null) {
      this.slideService.updateSlide(this.editIndex, this.newSlide);
    } else {
      this.slideService.addSlide(this.newSlide);
    }
    this.showForm = false;
    this.newSlide = { url: '', slideTime: 0, transition: 'fade' };
    this.editIndex = null;
  }

  deleteSlide() {
    if (this.editIndex !== null) {
      this.slideService.removeSlide(this.editIndex);
    }
  }
}
