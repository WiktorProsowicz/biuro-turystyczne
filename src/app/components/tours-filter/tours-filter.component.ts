import { Component } from '@angular/core';
import { ToursService } from '../../shared/services/tours.service';
import { Tour } from '../../shared/interfaces/tour';
import { ToursFilterService } from '../../shared/services/tours-filter.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyService } from '../../shared/services/currency.service';
import { CurrencyPipe, DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-tours-filter',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, NgFor, ReactiveFormsModule, DecimalPipe],
  templateUrl: './tours-filter.component.html',
  styleUrl: './tours-filter.component.css'
})
export class ToursFilterComponent {


  destinationForm: FormGroup;

  constructor(private toursService: ToursService, public toursFilterService: ToursFilterService, private currencyService: CurrencyService) {

    this.destinationForm = new FormGroup({
      destination: new FormControl()
    });

  }

  availableDestinations() {
    return this.toursService.getTours().map((tour: any) => tour.targetCountry).filter((country: any, index: any) => {
      return this.toursService.getTours().map((tour: any) => tour.targetCountry).indexOf(country) === index;
    });
  }

  reload() {
    this.toursService.reload();
  }

  setDestination() {
    if (this.destinationForm.value.destination === 'All') {
      this.toursFilterService.toursFilter.destination = undefined;
    }
    else {
      this.toursFilterService.toursFilter.destination = this.destinationForm.value.destination;
    }

    this.reload();
  }

  minPriceConv() {
    return this.currencyService.convertPrice(this.toursFilterService.toursFilter.minPrice || 0);
  }

  maxPriceConv() {
    return this.currencyService.convertPrice(this.toursFilterService.toursFilter.maxPrice || 0);
  }

  currencyCode() {
    return this.currencyService.currencyCode;
  }

  maxPrice() {
    return this.toursFilterService.toursFilter.maxPrice || 0;
  }

  minPrice() {
    return this.toursFilterService.toursFilter.minPrice || 0;
  }

  maxRating() {
    return this.toursFilterService.toursFilter.maxRating || 0;
  }

  minRating() {
    return this.toursFilterService.toursFilter.minRating || 0;
  }

}
