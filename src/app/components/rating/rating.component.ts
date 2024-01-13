import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgClass, DecimalPipe, NgIf],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  @Input() average: number = 0;
  @Input() current: number = 0;
  @Input() numberOfRatings: number = 0;

  @Output() rated = new EventEmitter<number>();

  constructor() { }

  rate(rating: number) {
    this.rated.emit(rating);
  }
}
