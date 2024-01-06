import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilteredHistoryPipe } from '../../shared/pipes/filtered-history.pipe';
import { getTourStatus } from '../../shared/helpers';
import { MenuComponent } from '../menu/menu.component';
import { CurrencyService } from '../../shared/services/currency.service';
import { HistoryService } from '../../shared/services/history.service';
import { ToursService } from '../../shared/services/tours.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor, FormsModule, DatePipe, FilteredHistoryPipe, MenuComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  filterStatus: any = 'all';

  constructor(private currencyService: CurrencyService, private historyService: HistoryService, private toursService: ToursService) { }

  getHistory() {
    return this.historyService.getPurchases();
  }

  getStatus(tour: any) {
    return getTourStatus(tour);
  }

  getCurrencyCode() {
    return this.currencyService.getCurrencyCode();
  }


}
