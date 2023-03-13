import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StyleClassModule } from 'primeng/styleclass';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { TableComponent } from './shared/components/table/table.component';
import { ProductTableComponent } from './component/product-table/product-table.component';
import { ProductPriceComponent } from './component/product-price/product-price.component';
import { ProductMaintenanceComponent } from './component/product-maintenance/product-maintenance.component';
import { FormComponent } from './shared/components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './shared/components/toast/toast.component';
import { MessageService } from 'primeng/api';
import { ToasterInterceptor } from './Interceptor/interceptor/toast.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ProductTableComponent,
    ProductPriceComponent,
    ProductMaintenanceComponent,
    FormComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    PaginatorModule,
    BrowserAnimationsModule,
    StyleClassModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: ToasterInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
