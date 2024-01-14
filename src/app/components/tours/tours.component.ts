import { Component } from '@angular/core';
import { CurrencyPipe, NgClass, NgFor, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { FilteredToursPipe } from '../../shared/pipes/filtered-tours.pipe';
import { TourComponent } from '../tour/tour.component';
import { BasketComponent } from '../basket/basket.component';
import { HistoryComponent } from '../history/history.component';
import { MenuComponent } from '../menu/menu.component';
import { ToursService } from '../../shared/services/tours.service';
import { Tour } from '../../shared/interfaces/tour';
import { ToursFilterService } from '../../shared/services/tours-filter.service';
import { ToursFilterComponent } from '../tours-filter/tours-filter.component';


@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [NgFor, BasketComponent, TourComponent, NgIf, NgClass, NgStyle, FilteredToursPipe, UpperCasePipe, CurrencyPipe, FormsModule, ReactiveFormsModule, HistoryComponent, MenuComponent, ToursFilterComponent],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {

  constructor(private toursService: ToursService, public toursFilterService: ToursFilterService) {

  }

  deleteTour(tour: Tour) {
    this.toursService.deleteTour(tour);
  }

  getTours() {
    return this.toursService.getTours();
  }

  getTourPriceIndication(tour: Tour) {

    if (this.getTours().length < 2) return {};

    const mostExpensive = Math.max(...this.getTours().map((t: any) => t.price));
    const cheapest = Math.min(...this.getTours().map((t: any) => t.price));

    if (tour.price === mostExpensive) {
      return "tour-most-expensive"; // Class for most expensive
    } else if (tour.price === cheapest) {
      return "tour-cheapest"; // Class for cheapest
    } else {
      return ""; // Default class
    }
  }
}
