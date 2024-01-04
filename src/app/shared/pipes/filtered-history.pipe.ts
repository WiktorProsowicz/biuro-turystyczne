import { Pipe, PipeTransform } from '@angular/core';
import { getTourStatus } from './shared/helpers';

@Pipe({
  name: 'filteredHistory',
  standalone: true
})
export class FilteredHistoryPipe implements PipeTransform {

  transform(historyItems: any[], filterStatus: any): any[] {

    console.log(historyItems);

    return historyItems.filter((historyItem: any) => {
      return (getTourStatus(historyItem) == filterStatus) || (filterStatus == 'all');
    });
  }

}
