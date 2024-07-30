import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PopupComponent, AboutComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  today: number = new Date().getFullYear();
  showPopup: boolean = false;

  show(event: Event): void {
    event.preventDefault();
    this.showPopup = true;
  }
}
