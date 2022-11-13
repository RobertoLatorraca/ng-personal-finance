import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { CardsComponent } from './cards/cards.component';
import { LoadingModule } from 'src/app/shared/loading/loading.module';


@NgModule({
  declarations: [
    AccountsComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    LoadingModule
  ]
})
export class AccountsModule { }
