import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, throwError, timeout } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { CurrencyService } from 'src/app/services/currency.service';
import { RestCountriesService } from 'src/app/services/rest-countries.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-currencies-add-edit',
  templateUrl: './currencies-add-edit.component.html',
  styleUrls: ['./currencies-add-edit.component.scss']
})
export class CurrenciesAddEditComponent implements OnInit {

  isLoading: boolean = true;

  countryList: any[] = [];
  currencyList: any[] = [];

  currencyForm = new FormGroup({
    country: new FormControl('', Validators.required),
    currency: new FormControl({value: '', disabled: true}),
    rate: new FormControl('', Validators.required),
    enabled: new FormControl('')
    },
    {
      validators: this.validateSelectCurrencyControl
    }
  );

  isEditMode: boolean = false;
  retrievingDataFromDb: boolean = false;
  id!: string;
  currencyObj: Currency = new Currency();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private currencyService: CurrencyService,
    private restCountriesService: RestCountriesService,
    private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    // Verifico si se esta agregando una nueva currency o si se esta editando una existente.
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isEditMode = true;
      this.retrievingDataFromDb = true;
    }
    // Pueblo el array de countries desde REST COUNTRIES. Bloqueo el hilo.
    this.countryList = await lastValueFrom(this.restCountriesService.findAll())
      .catch((err: any) => {
        if (this.id) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
        this.toastService.error(err.message + '. You can\'t add/edit currencies at this moment. Try later.', { autoClose: false, keepAfterRouteChange: false })
        return [];
      }
    );
    // Si estoy en modo editar cargo los datos desde la DB al formulario, debe hacerse luego de poblar el array de countries.
    if (this.id) {
      this.currencyService.findById(this.id).subscribe({
        next: (resp: Currency) => {
          this.currencyObj.id = resp.id;

          let country = this.countryList.find(c => c.cca3 == resp.cca3);
          this.currencyForm.get('country')?.setValue(country);

          this.currencyList = this.restCountriesService.getCurrenciesFromCountry(country);
          let currency = this.currencyList.find(c => c.code == resp.code);
          this.currencyForm.get('currency')?.setValue(currency);
          this.toggleEnableDisableCurrencySelect(this.currencyList);

          this.currencyForm.get('rate')?.setValue(resp.exchangeRate);
          this.currencyForm.get('enabled')?.setValue(resp.enabled);
        },
        complete: () => this.retrievingDataFromDb = false
      });
    }

    this.isLoading = false;

  }

  onSelectCountryChange(country: any): void {
    if (this.retrievingDataFromDb === true) return;

    this.currencyForm.get('currency')?.setValue('');
    this.currencyList = this.restCountriesService.getCurrenciesFromCountry(country);

    this.toggleEnableDisableCurrencySelect(this.currencyList);
    if (this.currencyList.length === 0) {
      this.toastService.warning("There are no currencies for the current selection.", { autoClose: true, keepAfterRouteChange: false })
    }
    if (this.currencyList.length === 1) {
      this.currencyForm.get('currency')?.setValue(this.currencyList[0]);
    }
  }

  onSubmit(): void {
    this.currencyObj.cca3 = this.currencyForm.get('country')?.value.cca3;
    this.currencyObj.country = this.currencyForm.get('country')?.value.name.official;
    this.currencyObj.currency = this.currencyForm.get('currency')?.value.name;
    this.currencyObj.code = this.currencyForm.get('currency')?.value.code;
    this.currencyObj.symbol = this.currencyForm.get('currency')?.value.symbol;
    this.currencyObj.exchangeRate = this.currencyForm.get('rate')?.value;
    this.currencyObj.enabled = this.currencyForm.get('enabled')?.value;
    
    if (this.isEditMode === false) {
      this.currencyObj.enabled = true;
      this.currencyService.save(this.currencyObj).subscribe({
        complete: () => {
          this.toastService.success("New currency registered successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err: any) => {
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
        }
      });
    } else {
      this.currencyService.update(this.currencyObj).subscribe({
        complete: () => {
          this.toastService.success("Currency edited successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err: any) => {
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
        }
      });
    }
  }

  private toggleEnableDisableCurrencySelect(currencyList: any[]): void {
    (currencyList.length > 1) ? this.currencyForm.get('currency')?.enable() : this.currencyForm.get('currency')?.disable();
  }

  validateSelectCurrencyControl(abstractControl: AbstractControl): ValidationErrors | null {
    const currency = abstractControl.get('currency')?.value;
    if (currency != '') {
      return null;
    } else {
      return { currencyRequired: true };
    }
  }

}
