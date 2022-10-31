import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  isLoading: boolean = true;
  title: string = 'Account';
  columns = [
    { field: "account", name: "Account", style: {} },
    { field: "accountType", name: "Type", style: {} },
    { field: "bank", name: "Bank", style: {} },
    { field: "enabled", name: "Status", style: {} }
  ];
  data: Account[] = [];

  constructor(private accountService: AccountService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.accountService.findAll().subscribe({
      next: (resp: Account[]) => {
        resp.forEach((account) => {
          if (account.enabled.toString() == "true") {
            account.enabled = "Enabled";
          } else {
            account.enabled = "Disabled";
          }
          (account.bank === null) ? account.bank = "-" : account.bank = account.bank.name;
        });
        this.data = resp;
      },
      complete: () => this.isLoading = false,
      error: (err: any) => {
        this.isLoading = false;
        this.toastService.error("Error in comunication with the backend.", { autoClose: false, keepAfterRouteChange: false })
      }
    });
  }

}
