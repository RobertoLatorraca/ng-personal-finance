import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { BanksAddEditComponent } from './banks-add-edit/banks-add-edit.component';
import { BanksListComponent } from './banks-list/banks-list.component';
import { CategoriesAddEditComponent } from './categories-add-edit/categories-add-edit.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CurrenciesAddEditComponent } from './currencies-add-edit/currencies-add-edit.component';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { PayeesAddEditComponent } from './payees-add-edit/payees-add-edit.component';
import { PayeesListComponent } from './payees-list/payees-list.component';
import { TagsAddEditComponent } from './tags-add-edit/tags-add-edit.component';
import { TagsListComponent } from './tags-list/tags-list.component';

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

  { path: 'tags', component: TagsListComponent },
  { path: 'tags/add', component: TagsAddEditComponent },
  { path: 'tags/edit/:id', component: TagsAddEditComponent },

  { path: 'categories', component: CategoriesListComponent },
  { path: 'categories/add', component: CategoriesAddEditComponent },
  { path: 'categories/edit/:id', component: CategoriesAddEditComponent },

  { path: 'accounts', component: AccountsListComponent },

  { path: '', redirectTo: 'banks', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
