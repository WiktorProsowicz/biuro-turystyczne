import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ToursService } from '../../shared/services/tours.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tour',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule],
  templateUrl: './add-tour.component.html',
  styleUrl: './add-tour.component.css'
})
export class AddTourComponent {

  tourForm: FormGroup;

  constructor(private toursService: ToursService) {
    this.tourForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      targetCountry: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.max(10000)]),
      maxPeople: new FormControl('', [Validators.required, Validators.max(30)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      image: new FormControl('', [])
    });
  }

  addTour() {

    const tour = this.tourForm.value;

    tour['id'] = this.toursService.getNextId();
    tour['bookedSeats'] = 0;
    tour['rating'] = 0;

    this.toursService.addTour(tour);

    this.tourForm.reset();
  }

}
