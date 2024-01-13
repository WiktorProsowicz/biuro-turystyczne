import { Pipe, PipeTransform } from '@angular/core';
import { getTourStatus } from '../helpers';
import { Purchase } from '../interfaces/purchase';

@Pipe({
  name: 'filteredHistory',
  standalone: true
})
export class FilteredHistoryPipe implements PipeTransform {

  transform(historyItems: Purchase[], filterStatus: string): Purchase[] {

    return historyItems.filter((historyItem: any) => {
      return (getTourStatus(historyItem.tour) == filterStatus) || (filterStatus == 'all');
    });
  }

}
