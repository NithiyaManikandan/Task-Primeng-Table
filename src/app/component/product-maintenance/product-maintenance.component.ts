import { Component } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Product } from 'src/app/Model/field';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-product-maintenance',
  templateUrl: './product-maintenance.component.html',
  styleUrls: ['./product-maintenance.component.scss'],
})
export class ProductMaintenanceComponent {
  constructor(private service: TableService) {}

  cols = [
    { field: 'id', header: 'id' },
    { field: 'title', header: 'title' },
    { field: 'stock', header: 'stock' },
    { field: 'category', header: 'category' },
    { field: 'action', header: 'Action' },
  ];

  rowsPerPageOption = [5, 10, 15, 20, 25];
  productLimit = 5;
  pageIndex: number = 0;
  productList: any;
  actionId!: number;
  actionData!: Product[];
  totalLength!: number;
  showform: boolean = false;
  actionIds: number = 0;
  actionOption: boolean = false;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.service.getAllProducts(this.productLimit, this.pageIndex).subscribe(
      (res) => {
        this.totalLength = res.res.length;
        this.productList = res.filteredProducts;
      },
      (err) => {
        this.actionOption = true;
      }
    );
  }

  pageEvent(pageNumber: any) {
    this.pageIndex = pageNumber.page;
    this.productLimit = pageNumber.rows;
    this.loadProduct();
  }

  actionEvent($event: { option: string; id: number; }) {
    if ($event.option == 'update') {
      this.service.getProductById($event.id).subscribe(
        (res) => {
          this.actionData = res;
          this.showform = !this.showform;
          this.loadProduct();
        },
        (err) => (this.actionOption = true)
      );
    } else if ($event.option == 'delete') {
      this.service.deleteProduct($event.id).subscribe(
        (res) => {
          this.actionOption = true;
          this.loadProduct();
        },
        (err) => (this.actionOption = true)
      );
    }
  }

  testUpdate(event: boolean) {
    this.showform = event;
  }

  updateForm($event: FormGroup) {
    this.service.updateProduct($event).subscribe(
      (res) => {
        this.loadProduct();
      },
      (err) => (this.actionOption = true)
    );
  }
}
