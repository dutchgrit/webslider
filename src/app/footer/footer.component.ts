import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ PopupComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  today: number = new Date().getFullYear();
  showPopup: boolean = false;

  show(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.showPopup = true;
  }
}
