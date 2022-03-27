import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-banks-add-edit',
  templateUrl: './banks-add-edit.component.html',
  styleUrls: ['./banks-add-edit.component.scss']
})
export class BanksAddEditComponent implements OnInit {

  bankForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    enabled: new FormControl('')
  });
  isEditMode: boolean = false;
  id!: string;
  bank: Bank = new Bank();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bankService: BankService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isEditMode = true;
      this.bankService.findById(this.id).subscribe({
        next: (resp: Bank) => {
          this.bankForm.patchValue(resp);
          this.bank = resp;
        },
        error: (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      });
    }
  }

  onSubmit(): void {
    this.bank.name = this.bankForm.get('name')?.value;
    this.bank.name = this.bank.name.trim();
    this.bank.enabled = this.bankForm.get('enabled')?.value;
    if (this.isEditMode == false) {
      this.bank.enabled = true;
      this.bankService.save(this.bank).subscribe({
        complete: () => {
          this.toastService.success("New bank registered successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    } else {
      this.bankService.update(this.bank).subscribe({
        complete: () => {
          this.toastService.success("Bank edited successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    }
  }

}
