import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilteredHistoryPipe } from '../../shared/pipes/filtered-history.pipe';
import { getTourStatus } from '../../shared/helpers';
import { MenuComponent } from '../menu/menu.component';
import { CurrencyService } from '../../shared/services/currency.service';
import { ToursService } from '../../shared/services/tours.service';
import { PurchasingService } from '../../shared/services/purchasing.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor, FormsModule, DatePipe, FilteredHistoryPipe, MenuComponent, NgIf],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  filterStatus: any = 'all';

  constructor(private currencyService: CurrencyService, private purchasingService: PurchasingService) { }

  getHistory() {
    return this.purchasingService.getPurchases();
  }

  getStatus(tour: any) {
    return getTourStatus(tour);
  }

  getCurrencyCode() {
    return this.currencyService.getCurrencyCode();
  }


}
