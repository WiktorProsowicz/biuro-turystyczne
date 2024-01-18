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
import { GoogleMapsModule } from '@angular/google-maps';
import { ToursRatingService } from '../../shared/services/tours-rating.service';
import { RatingComponent } from '../rating/rating.component';
import { OpinionsService } from '../../shared/services/opinions.service';
import { OpinionComponent } from '../opinion/opinion.component';
import { Opinion } from '../../shared/interfaces/opinion';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Loader } from '@googlemaps/js-api-loader';
import { UsersService } from '../../shared/services/users.service';


@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, OpinionComponent, NgIf, RatingComponent, GoogleMapsModule, MenuComponent, NgClass, NgFor, CurrencyPipe, UpperCasePipe, BookingComponent, NgbModule, RouterLink, RouterLinkActive],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent {

  tourDetail: TourDetail = {
    tourId: 0,
    description: '',
    images: []
  };

  tour: Tour = {
    id: 0,
    name: '',
    price: 0,
    targetCountry: '',
    startDate: '',
    endDate: '',
    description: '',
    image: '',
    maxPeople: 0,
  };

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 4;

  mapGeocoder: any;
  opinionForm: FormGroup;

  formErrors = {
    topicLength: '',
    commentLength: '',
  };

  mapsLoaded = false;

  constructor(private opinionsService: OpinionsService, private ratingService: ToursRatingService, private activatedRoute: ActivatedRoute, private toursService: ToursService, private detailService: TourDetailService, private currencyService: CurrencyService, private bookingService: ToursBookingService, private purchasingService: PurchasingService, private router: Router, db: AngularFireDatabase, private usersService: UsersService) {

    this.opinionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      comment: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
      dateBought: new FormControl('', [])
    });

    const loader = new Loader({
      apiKey: "AIzaSyC93gUtO26l9YC_yrG1O54e6WiL-gOzfYE",
      version: "weekly",
      libraries: ["places"]
    });

    this.activatedRoute.paramMap.subscribe(params => {
      let tourId = +params.get('id');

      db.object('tours').valueChanges().subscribe(() => {

        if (this.toursService.getTour(tourId) == null) {
          this.router.navigate(['/404']);
          return;
        }

        this.tour = this.toursService.getTour(tourId);

        loader.importLibrary('places').then(() => {
          this.mapsLoaded = true;
          this.obtainLocalization(this.tour.targetCountry);
        });

        db.object('details').valueChanges().subscribe(() => {

          this.tourDetail = this.detailService.getDetail(this.tour);
        });

        // db.object('opinions').valueChanges().subscribe(() => {

        //   this.opinions = this.opinionsService.getOpinions(this.tour);
        // });
      });

    });

  }

  getOpinions() {
    return this.opinionsService.getOpinions(this.tour);
  }

  obtainLocalization(country: string) {

    this.mapGeocoder = new google.maps.Geocoder();

    const request: google.maps.GeocoderRequest = {
      address: country
    };

    this.mapGeocoder.geocode(request, (results, status) => {

      if (status === google.maps.GeocoderStatus.OK) {

        this.center = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
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

    if(this.usersService.getCurrentUser() == null) {
      this.router.navigate(['/sign-in']);
      return;
    }

    this.formErrors = {
      topicLength: '',
      commentLength: '',
    };


    const newOpinion: Opinion = {
      id: this.opinionsService.getMaxId() + 1,
      tourId: this.tour.id,
      userId: this.usersService.getCurrentUser().id,
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

      this.opinionsService.addOpinion(newOpinion);
    }
  }


}
