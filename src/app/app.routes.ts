import { Routes } from '@angular/router';

import { ToursComponent } from './components/tours/tours.component';
import { HistoryComponent } from './components/history/history.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'basket', pathMatch: 'full' },
  { path: 'tours', component: ToursComponent },
  { path: 'basket', component: BasketPageComponent },
  { path: 'history', component: HistoryComponent },
];
