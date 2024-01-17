import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, GoogleMapsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  mapsLoaded = false;

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 17;

  mapGeocoder: any;

  constructor() {
    const loader = new Loader({
      apiKey: "AIzaSyC93gUtO26l9YC_yrG1O54e6WiL-gOzfYE",
      version: "weekly",
      libraries: ["places"]
    });

    loader.importLibrary('places').then(() => {
      this.mapsLoaded = true;
      this.obtainLocalization();
    });
  }

  obtainLocalization() {

    this.mapGeocoder = new google.maps.Geocoder();

    const request: google.maps.GeocoderRequest = {
      address: 'Kraków, Kinky Ramen'
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
}
