import { Component, OnInit } from '@angular/core';
import { Payee } from 'src/app/models/payee';
import { PayeeService } from 'src/app/services/payee.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-payees-list',
  templateUrl: './payees-list.component.html',
  styleUrls: ['./payees-list.component.scss']
})
export class PayeesListComponent implements OnInit {

  isLoading: boolean = true;

  title: string = 'Payee';
  columns = [
    { field: "name", name: "Name", style: {} },
  ];
  data: any[] = [];
  
  constructor(private payeeService: PayeeService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.payeeService.findAll().subscribe({
      next: (resp: Payee[]) => this.data = resp,
      complete: () => this.isLoading = false,
      error: (err: any) => {
        this.isLoading = false;
        this.toastService.error("Error in comunication with the backend.", { autoClose: false, keepAfterRouteChange: false })
      }
    });
  }

}
