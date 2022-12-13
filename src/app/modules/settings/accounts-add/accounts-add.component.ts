import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bank } from 'src/app/models/bank';
import { Currency } from 'src/app/models/currency';
import { BankService } from 'src/app/services/bank.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-accounts-add',
  templateUrl: './accounts-add.component.html',
  styleUrls: ['./accounts-add.component.scss']
})
export class AccountsAddComponent implements OnInit {

  isLoading: boolean = false;

  addAccountForm = new FormGroup({
    account: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    bank: new FormControl(null, Validators.required),
    currency: new FormControl(null, Validators.required),
    cbu: new FormControl('', [
      Validators.required,
      Validators.minLength(22),
      Validators.maxLength(22)
    ]),
    accountNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    alias: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    creditCardBrand: new FormControl(null, Validators.required),
    creditCardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    expiration: new FormControl('', Validators.required)
  });

  accountType!: string;
  banks: Bank[] = [];
  currencies: Currency[] = [];
  brands: string[] = ['VISA', 'MASTERCARD', 'AMEX', 'NARANJA'];
  cardAccountTypeStatus: string = '';

  constructor(private bankService: BankService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.bankService.findAll().subscribe({
      next: (resp: Bank[]) => {
        this.banks = resp;
        console.log(this.banks);
      },
      complete: () => {},
      error: () => {}
    });
    this.currencyService.findAll().subscribe({
      next: (resp: Currency[]) => {
        this.currencies = resp;
        console.log(this.currencies);
      },
      complete: () => {},
      error: () => {}
    });
  }

  setAccountType(event: MouseEvent): void {

    var el:any  = event.target;


    console.log(el)

    el.style = "background-color: red;"



  }

  onSubmit(): void { }

}
