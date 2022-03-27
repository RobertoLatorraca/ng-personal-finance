import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/currency';
import { CurrencyService } from 'src/app/services/currency.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.scss']
})
export class CurrenciesListComponent implements OnInit {

  isLoading: boolean = true;
  title: string = 'Currency';
  columns = [
    { field: "cca3", name: "Country Code", style: {} },
    { field: "country", name: "Country", style: {} },
    { field: "currency", name: "Currency", style: {} },
    { field: "code", name: "Currency Code", style: {} },
    { field: "symbol", name: "Symbol", style: {} },
    { field: "exchangeRate", name: "Exchange Rate", style: {} },
    { field: "enabled", name: "Enabled", style: {} }    
  ];
  data: any[] = [];

  constructor(private currencyService: CurrencyService,
    private toastService: ToastService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.currencyService.findAll().subscribe({
      next: (resp: Currency[]) => {
        resp.forEach((currency) => {
          if (currency.enabled.toString() == "true") {
            currency.enabled = "Enabled";
          } else {
            currency.enabled = "Disabled";
          }
        });
        this.data = resp;
        this.cdRef.detectChanges();
      },
      complete: () => this.isLoading = false,
      error: (err: any) => {
        this.isLoading = false;
        this.toastService.error("Error in comunication with the backend.", { autoClose: false, keepAfterRouteChange: false });
      }
    });
  }

}
