import { Pipe, PipeTransform } from '@angular/core';
import { Tour } from '../interfaces/tour';
import { ToursFilter } from '../interfaces/tours-filter';
import { ToursRatingService } from '../services/tours-rating.service';

@Pipe({
  name: 'filteredTours',
  standalone: true
})
export class FilteredToursPipe implements PipeTransform {

  constructor(private ratingService: ToursRatingService) { }

  transform(tours: Tour[], toursFilter: ToursFilter): Tour[] {

    if (!toursFilter) {
      return tours;
    }

    return tours?.filter((tour: any) => {


      if (toursFilter?.minPrice && tour.price < toursFilter.minPrice) {
        return false;
      }

      if (toursFilter?.maxPrice && tour.price > toursFilter.maxPrice) {
        return false;
      }

      if (toursFilter?.minRating && this.ratingService.getAverageTourRating(tour) < toursFilter.minRating) {
        return false;
      }

      if (toursFilter?.maxRating && this.ratingService.getAverageTourRating(tour) > toursFilter.maxRating) {
        return false;
      }

      if (toursFilter?.destination) {
        if (tour.targetCountry !== toursFilter.destination) {
          return false;
        }
      }

      if (toursFilter?.startDate) {
        if (tour.startDate < toursFilter.startDate) {
          return false;
        }
      }

      if (toursFilter?.endDate) {
        if (tour.endDate > toursFilter.endDate) {
          return false;
        }
      }

      return true;
    });

  }

}
