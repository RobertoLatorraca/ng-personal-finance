import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Bank } from 'src/app/models/bank';
import { Currency } from 'src/app/models/currency';
import { AccountService } from 'src/app/services/account.service';
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
    accountType: new FormControl('', Validators.required),
    account: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    currency: new FormControl(null, Validators.required),
    bank: new FormControl(null, this.bankValidator()),
    accountNumber: new FormControl('', this.accountNumberValidator()),
    cbu: new FormControl('', this.cbuValidator()),
    alias: new FormControl('', this.aliasValidator()),
    creditCardBrand: new FormControl(null, this.creditCardBrandValidator()),
    creditCardNumber: new FormControl('', this.creditCardNumberValidator()),
    expiration: new FormControl('', this.expirationValidator())
  });

  accountTypes: any[] = [];
  banks: Bank[] = [];
  currencies: Currency[] = [];
  brands: string[] = ['VISA', 'MASTERCARD', 'AMEX', 'NARANJA'];
  cardAccountTypeStatus: string = '';

  constructor(private bankService: BankService, private currencyService: CurrencyService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.bankService.findAll().subscribe({
      next: (resp: Bank[]) => {
        this.banks = resp;
      },
      complete: () => {},
      error: () => {}
    });
    this.currencyService.findAll().subscribe({
      next: (resp: Currency[]) => {
        this.currencies = resp;
      },
      complete: () => {},
      error: () => {}
    });
    this.accountService.getAccountTypes().subscribe({
      next: (resp) => this.accountTypes.push(resp)
    });
  }

  selectAccountType(accountType: any): void {
    this.addAccountForm.get('accountType')?.setValue(accountType.type);
    updateTreeValidity(this.addAccountForm);
  }

  onNextPage1():void {
    if (!this.addAccountForm.get('accountType')?.valid) return;
    console.log('continua el codigo')
    console.log(this.addAccountForm)
  }

  onNextPage2():void {
    if (this.addAccountForm.get('account')?.errors || this.addAccountForm.get('currency')?.errors) return;
    console.log('continua el codigo')
  }

  onSubmit(): void { }

  bankValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent?.get('accountType')?.value !== 'BANK') return null;
      if (isEmptyInputValue(control.value)) return { 'required': true };
      return null;
    };
  }

  accountNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const MIN_LENGTH = 8;
      if (control.parent?.get('accountType')?.value !== 'BANK') return null;
      if (isEmptyInputValue(control.value)) return { 'required': true };
      if (hasValidLength(control.value) && control.value.length < MIN_LENGTH) return { 'minlength': {'requiredLength': MIN_LENGTH, 'actualLength': control.value.length} };
      return null;
    };
  }

  cbuValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const CBU_LENGTH = 22;
      if (control.parent?.get('accountType')?.value !== 'BANK') return null;
      if (isEmptyInputValue(control.value)) return { 'required': true };
      if (control.value.length !== CBU_LENGTH) return { 'length': {'requiredLength': CBU_LENGTH, 'actualLength': control.value.length} };
      if (!patternValidator("^\\d+$", control.value)) return { 'pattern': {'requiredPattern': '^\\d+$', 'actualValue': control.value } };
      return null;
    };
  }

  aliasValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent?.get('accountType')?.value !== 'BANK') return null;
      if (isEmptyInputValue(control.value)) return { 'required': true };
      return null;
    };
  }

  creditCardBrandValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent?.get('accountType')?.value !== 'CREDIT_CARD') return null;
      if (isEmptyInputValue(control.value)) return { 'required': true };
      return null;
    };
  }

  creditCardNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent?.get('accountType')?.value !== 'CREDIT_CARD') return null;
      if (isEmptyInputValue(control.value)) return { 'required': true };
      return null;
    };
  }

  expirationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent?.get('accountType')?.value !== 'CREDIT_CARD') return null;
      if (isEmptyInputValue(control.value)) return { 'required': true };
      return null;
    };
  }

}

function hasValidLength(value: any): boolean {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}

function isEmptyInputValue(value: any): boolean {
  /**
   * Check if the object is a string or array before evaluating the length attribute.
   * This avoids falsely rejecting objects that contain a custom length attribute.
   * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
   */
  return value == null ||
      ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}

function patternValidator(pattern: string|RegExp, value: any): boolean {
  if (!pattern) return false;
  if (typeof pattern === 'string') {
    let regex: RegExp = new RegExp(pattern);
    return regex.test(value);
  } else {
    return false;
  }
}

function updateTreeValidity(group: FormGroup): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.controls[key];
    if (abstractControl instanceof FormGroup) {
      updateTreeValidity(abstractControl);
    } else {
      abstractControl.updateValueAndValidity();
    }
  });
}