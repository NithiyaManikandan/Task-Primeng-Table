import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/Model/field';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss'],
})
export class ProductPriceComponent {
  constructor(private service: TableService) {}
  cols = [
    { field: 'id', header: 'id' },
    { field: 'images', header: 'images' },
    { field: 'title', header: 'title' },
    { field: 'price', header: 'price' },
    { field: 'discountPercentage', header: 'discountPercentage' },
    { field: 'action', header: 'Action' },
  ];
  rowsPerPageOption = [8, 16, 24];
  productLimit = 8;
  pageIndex: number = 0;
  productList: Product[] = [];
  actionId!: number;
  totalLength!: number;
  showform: boolean = false;
  actionIds: number = 0;
  actionData!: Product[];
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

  actionEvent($event: { option: string; id: number }) {
    if ($event.option == 'update') {
      this.service.getProductById($event.id).subscribe(
        (res) => {
          this.showform = !this.showform;
          this.actionData = res;
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
