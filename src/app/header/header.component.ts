import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ISlide } from './Slide';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showSettings: boolean = false;
  showForm: boolean = false;

  startSlideShow() {
    throw new Error('Method not implemented.');
  }
}
