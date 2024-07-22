import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  today: number = new Date().getFullYear();

  showAbout(event: Event): void {
    event.preventDefault();
    console.log('Show about popup');
  }
}
