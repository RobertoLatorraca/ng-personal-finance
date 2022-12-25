import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  links: Observable<any> = of(
    {
      title: "Dashboard",
      url: "",
      icon: "fas fa-home"
    },
    {
      title: "Accounts",
      url: "accounts",
      icon: "fas fa-cubes"
    },
    {
      title: "Calendar",
      url: "",
      icon: "fas fa-calendar-alt"
    },
    {
      title: "Settings",
      url: "",
      icon: "fas fa-cog",
      sublinks: [
        {
          title: "Banks",
          url: "settings/banks"
        },
        {
          title: "Accounts",
          url: "settings/accounts"
        },
        {
          title: "Categories",
          url: "settings/categories"
        },
        {
          title: "Currencies",
          url: "settings/currencies"
        },
        {
          title: "Payees",
          url: "settings/payees"
        },
        {
          title: "Tags",
          url: "settings/tags"
        }
      ]
    }
  );

  constructor() { }

  public getNavbarLinks(): Observable<any> {
    return this.links;
  }

}
