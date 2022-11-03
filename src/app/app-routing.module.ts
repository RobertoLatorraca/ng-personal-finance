import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsModule } from './modules/accounts/accounts.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

const routes: Routes = [

  {
    path: 'dashboard',
    loadChildren: () => DashboardModule
  },
  {
    path: 'accounts',
    loadChildren: () => AccountsModule
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
