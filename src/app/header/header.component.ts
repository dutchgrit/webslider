import { Component } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showSettings: boolean = false;
}
