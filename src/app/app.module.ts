import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { CardComponent } from './shared/card/card.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { ToastModule } from './shared/toast/toast.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TopbarComponent,
    CardComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
