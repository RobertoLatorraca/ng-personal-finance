import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksListComponent } from './banks-list/banks-list.component';
import { BanksAddEditComponent } from './banks-add-edit/banks-add-edit.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { TableComponent } from 'src/app/shared/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { CurrenciesAddEditComponent } from './currencies-add-edit/currencies-add-edit.component';
import { PayeesListComponent } from './payees-list/payees-list.component';
import { PayeesAddEditComponent } from './payees-add-edit/payees-add-edit.component';



@NgModule({
  declarations: [
    BanksListComponent,
    BanksAddEditComponent,
    TableComponent,
    CurrenciesListComponent,
    CurrenciesAddEditComponent,
    PayeesListComponent,
    PayeesAddEditComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    LoadingModule
  ]
})
export class SettingsModule { }
