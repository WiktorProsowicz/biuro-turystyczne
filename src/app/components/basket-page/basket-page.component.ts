import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { BasketComponent } from '../basket/basket.component';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-basket-page',
  standalone: true,
  imports: [MenuComponent, BasketComponent, SummaryComponent],
  templateUrl: './basket-page.component.html',
  styleUrl: './basket-page.component.css'
})
export class BasketPageComponent {

}
