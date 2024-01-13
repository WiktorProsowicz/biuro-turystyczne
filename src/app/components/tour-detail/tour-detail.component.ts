import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ToursService } from '../../shared/services/tours.service';
import { TourDetailService } from '../../shared/services/tours-detail.service';
import { Tour } from '../../shared/interfaces/tour';
import { TourDetail } from '../../shared/interfaces/tour-detail';
import { MenuComponent } from '../menu/menu.component';
import { CurrencyPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { CurrencyService } from '../../shared/services/currency.service';
import { ToursBookingService } from '../../shared/services/tours-booking.service';
import { PurchasingService } from '../../shared/services/purchasing.service';
import { BookingComponent } from '../booking/booking.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMap, GoogleMapsModule, MapGeocoder } from '@angular/google-maps';
import { ToursRatingService } from '../../shared/services/tours-rating.service';
import { RatingComponent } from '../rating/rating.component';
import { OpinionsService } from '../../shared/services/opinions.service';
import { OpinionComponent } from '../opinion/opinion.component';
import { Opinion } from '../../shared/interfaces/opinion';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, OpinionComponent, NgIf, RatingComponent, GoogleMapsModule, MenuComponent, NgClass, NgFor, CurrencyPipe, UpperCasePipe, BookingComponent, NgbModule, RouterLink, RouterLinkActive],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent {

  tourDetail: TourDetail;
  tour: Tour;
  opinions: Opinion[] = [];

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  coordinates = { latitude: 0, longitude: 0 };
  zoom = 4;

  mapGeocoder: any;
  opinionForm: FormGroup;

  formErrors = {
    topicLength: '',
    commentLength: '',
  };

  constructor(private opinionsService: OpinionsService, private ratingService: ToursRatingService, private activatedRoute: ActivatedRoute, private toursService: ToursService, private detailService: TourDetailService, private currencyService: CurrencyService, private bookingService: ToursBookingService, private purchasingService: PurchasingService, private router: Router) {

    this.opinionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      comment: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
      dateBought: new FormControl('', [])
    });


    this.activatedRoute.paramMap.subscribe(params => {
      let tourId = +params.get('id');

      if (this.toursService.getTour(tourId) == null) {
        this.router.navigate(['/404']);
      }

      this.tour = this.toursService.getTour(tourId);

      this.tourDetail = this.detailService.getDetail(this.tour);
    });

    this.opinions = this.opinionsService.getOpinions(this.tour);

  }

  ngAfterViewInit() {

    this.mapGeocoder = new google.maps.Geocoder();

    this.obtainLocalization(this.tour.targetCountry);
  }

  obtainLocalization(country: string) {

    const request: google.maps.GeocoderRequest = {
      address: country
    };

    this.mapGeocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {

        this.center.lat = results[0].geometry.location.lat();
        this.center.lng = results[0].geometry.location.lng();
      }

    });
  }

  getCurrencyCode() {
    return this.currencyService.getCurrencyCode();
  }

  convertPrice(price: number) {
    return this.currencyService.convertPrice(price);
  }

  cumulativeBookedSeats() {
    return this.purchasingService.getPurchasedSeats(this.tour) + this.bookingService.getTourBooking(this.tour);
  }

  numberOfRatings() {
    return this.ratingService.getNumberOfRatings(this.tour);
  }

  rateTour(rating: number) {
    this.ratingService.rateTour(this.tour, rating);
  }

  currentRating() {
    return this.ratingService.getLocalTourRating(this.tour);
  }

  averageRating() {
    return this.ratingService.getAverageTourRating(this.tour);
  }

  submitOpinion() {
    // console.log(this.opinionForm.value);

    this.formErrors = {
      topicLength: '',
      commentLength: '',
    };


    const newOpinion: Opinion = {
      id: this.opinionsService.getMaxId() + 1,
      tourId: this.tour.id,
      userId: 0,
      topic: this.opinionForm.value.name,
      opinion: this.opinionForm.value.comment,
      dateCreated: new Date().toISOString().split('T')[0],
      date: this.opinionForm.value.dateBought,
    };


    if (newOpinion.topic.length < 3 || newOpinion.topic.length > 50) {
      this.formErrors.topicLength = 'Topic must be between 3 and 50 characters long';
    }

    if (newOpinion.opinion.length < 50 || newOpinion.opinion.length > 500) {
      this.formErrors.commentLength = 'Comment must be between 50 and 500 characters long';
    }

    if (this.opinionForm.valid) {

      this.opinionForm.reset();

      this.opinions.push(newOpinion);
    }
  }


}
