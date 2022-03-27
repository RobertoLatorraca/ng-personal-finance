import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payee } from 'src/app/models/payee';
import { PayeeService } from 'src/app/services/payee.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-payees-add-edit',
  templateUrl: './payees-add-edit.component.html',
  styleUrls: ['./payees-add-edit.component.scss']
})
export class PayeesAddEditComponent implements OnInit {

  isLoading: boolean = true;

  payeeForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  isEditMode: boolean = false;
  id!: string;
  payee: Payee = new Payee();

  constructor(private payeeService: PayeeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isEditMode = true;
      this.payeeService.findById(this.id).subscribe({
        next: (resp: Payee) => {
          this.payeeForm.patchValue(resp);
          this.payee = resp;
        },
        complete: () => this.isLoading = false,
        error: (err: any) => this.router.navigate(['../../'], { relativeTo: this.route })
      });
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    this.payee.name = this.payeeForm.get('name')?.value;
    this.payee.name = this.payee.name.trim();
    if (this.isEditMode == false) {
      this.payeeService.save(this.payee).subscribe({
        complete: () => {
          this.toastService.success("New payee registered successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    } else {
      this.payeeService.update(this.payee).subscribe({
        complete: () => {
          this.toastService.success("Payee edited successfully!!!", { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err: any) =>
          this.toastService.error(err.error.errorText || err.message, { autoClose: false, keepAfterRouteChange: false })
      });
    }
  }

}
