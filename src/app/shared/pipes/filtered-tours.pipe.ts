import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteredTours',
  standalone: true
})
export class FilteredToursPipe implements PipeTransform {

  transform(tours: any[],
    priceMin: number,
    priceMax: number,
    startDateFilter: Date,
    endDateFilter: Date,
    ratingsFilter: any,
    destinationFilter: any): any[] {

    return tours?.filter(tour => {

      if (priceMin != null && tour.price < priceMin) return false;

      if (priceMax != null && tour.price > priceMax) return false;

      if (startDateFilter != null && tour.startDate < startDateFilter) return false;

      if (endDateFilter != null && tour.endDate > endDateFilter) return false;

      if (ratingsFilter[tour.rating] == false) return false;

      if (destinationFilter[tour.targetCountry] == false) return false;

      return true;

    });

  }

}
