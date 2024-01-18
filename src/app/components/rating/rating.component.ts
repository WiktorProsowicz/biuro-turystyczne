import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';

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

  constructor(private router: Router, private usersService: UsersService) { }

  rate(rating: number) {

    if(this.usersService.getCurrentUser() == null) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.rated.emit(rating);
  }
}
