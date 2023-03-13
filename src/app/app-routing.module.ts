import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductMaintenanceComponent } from './component/product-maintenance/product-maintenance.component';
import { ProductPriceComponent } from './component/product-price/product-price.component';
import { ProductTableComponent } from './component/product-table/product-table.component';
import { FormComponent } from'./shared/components/form/form.component';
import { TableComponent } from'./shared/components/table/table.component'

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
  {
    path: 'product',
    component: ProductTableComponent,
  },
  {
    path: 'price',
    component:ProductPriceComponent
  },
  {
    path:'maintenance',
    component:ProductMaintenanceComponent
  },
  {
    path:'form/:id',
    component:FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
