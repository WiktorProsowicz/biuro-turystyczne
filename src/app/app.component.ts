import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToursComponent } from './tours/tours.component';
import { HttpClientModule } from '@angular/common/http';
import { SummaryComponent } from './summary/summary.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToursComponent, HttpClientModule, SummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
