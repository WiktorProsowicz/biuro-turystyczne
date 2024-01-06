import { Routes } from '@angular/router';

import { ToursComponent } from './components/tours/tours.component';
import { HistoryComponent } from './components/history/history.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { AddTourComponent } from './components/add-tour/add-tour.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add-tour', pathMatch: 'full' },
  { path: 'tours', component: ToursComponent },
  { path: 'basket', component: BasketPageComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'add-tour', component: AddTourComponent }
];
