import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrencyService } from '../../shared/services/currency.service';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  currency: CurrencyService;

  constructor(currency: CurrencyService) {
    this.currency = currency;
  }

  isCurrencyActive(currencyCode: string) {
    return this.currency.getCurrencyCode() === currencyCode;
  }


}
