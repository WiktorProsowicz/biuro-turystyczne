import { DatePipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getTourStatus } from '../shared/helpers';
import { FilteredHistoryPipe } from '../filtered-history.pipe';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor, FormsModule, DatePipe, FilteredHistoryPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  @Input() history: any;
  @Input() currencyCode: any;

  filterStatus: any = 'all';

  getStatus(tour: any) {
    return getTourStatus(tour);
  }
}
