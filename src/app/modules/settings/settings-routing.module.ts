import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksAddEditComponent } from './banks-add-edit/banks-add-edit.component';
import { BanksListComponent } from './banks-list/banks-list.component';
import { CurrenciesAddEditComponent } from './currencies-add-edit/currencies-add-edit.component';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { PayeesAddEditComponent } from './payees-add-edit/payees-add-edit.component';
import { PayeesListComponent } from './payees-list/payees-list.component';

const routes: Routes = [

  { path: 'banks', component: BanksListComponent },
  { path: 'banks/add', component: BanksAddEditComponent },
  { path: 'banks/edit/:id', component: BanksAddEditComponent },

  { path: 'currencies', component: CurrenciesListComponent },
  { path: 'currencies/add', component: CurrenciesAddEditComponent },
  { path: 'currencies/edit/:id', component: CurrenciesAddEditComponent },

  { path: 'payees', component: PayeesListComponent },
  { path: 'payees/add', component: PayeesAddEditComponent },
  { path: 'payees/edit/:id', component: PayeesAddEditComponent },

  { path: '', redirectTo: 'banks', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
