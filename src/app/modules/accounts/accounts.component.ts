import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  isLoading: boolean = true;
  accounts: any[] = [];

  constructor(private accountService: AccountService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.accountService.findAll().subscribe({
      next: (resp: Account[]) => {
        this.accounts = resp;
        console.log(this.accounts);
      },
      complete: () => this.isLoading = false,
      error: (err: any) => {
        this.isLoading = false;
        this.toastService.error("Error in comunication with the backend.", { autoClose: false, keepAfterRouteChange: false })
      }
    });
  }

}
