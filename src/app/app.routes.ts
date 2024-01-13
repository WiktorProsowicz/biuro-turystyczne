import { Routes } from '@angular/router';

import { ToursComponent } from './components/tours/tours.component';
import { HistoryComponent } from './components/history/history.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { AddTourComponent } from './components/add-tour/add-tour.component';
import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'tours/:id', component: TourDetailComponent },
  { path: 'basket', component: BasketPageComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'add-tour', component: AddTourComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' }
];
