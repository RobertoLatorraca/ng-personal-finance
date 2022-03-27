import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { BankService } from 'src/app/services/bank.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrls: ['./banks-list.component.scss']
})
export class BanksListComponent implements OnInit {

  isLoading: boolean = true;
  title: string = 'Bank';
  columns = [
    { field: "name", name: "Name", style: {} },
    { field: "enabled", name: "Status", style: {} }
  ];
  data: any[] = [];

  constructor(private bankService: BankService, public toastService: ToastService) { }

  ngOnInit(): void {
    this.bankService.findAll().subscribe({
      next: (resp: Bank[]) => {
        resp.forEach((bank) => {
          if (bank.enabled.toString() == "true") {
            bank.enabled = "Enabled";
          } else {
            bank.enabled = "Disabled";
          }
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
