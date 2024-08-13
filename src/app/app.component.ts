import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlideListComponent } from './slide-list/slide-list.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SlideService } from './slide.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    SlideListComponent,
    SlideshowComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public slideService: SlideService) {}
}
