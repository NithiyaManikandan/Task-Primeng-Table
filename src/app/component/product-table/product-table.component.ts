import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/Model/field';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  constructor(private service: TableService) {}
  cols = [
    { field: 'id', header: 'Id', type: 'string' },
    { field: 'images', header: 'Images' },
    { field: 'title', header: 'Title', type: 'string' },
    { field: 'description', header: 'Description', type: 'string' },
    { field: 'brand', header: 'Brand', type: 'string' },
    { field: 'action', header: 'Action' },
  ];
  rowsPerPageOption = [6, 12, 18, 24, 30, 36];
  totalLength!: number;
  productLimit = 6;
  pageIndex: number = 0;
  productList!: Product[];
  actionIds!: number;
  actionData!: Product[];
  showform: boolean = false;
  actionOption: boolean = false;

  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    this.service.getAllProducts(this.productLimit, this.pageIndex).subscribe({
      next: (res) => {
        this.totalLength = res.res.length;
        this.productList = res.filteredProducts;
      },
      error: (err) => (this.actionOption = true),
    });
  }

  pageEvent(pageNumber: any) {
    this.pageIndex = pageNumber.page;
    this.productLimit = pageNumber.rows;
    this.loadProduct();
  }

  actionEvent($event: { option: string; id: number }) {
    if ($event.option == 'update') {
      this.service.getProductById($event.id).subscribe({
        next: (res) => {
          this.showform = !this.showform;
          this.actionData = res;
          this.loadProduct();
        },
        error: (err) => (this.actionOption = true),
      });
    } else if ($event.option == 'delete') {
      this.service.deleteProduct($event.id).subscribe({
        next: (res) => {
          this.actionOption = true;
          this.loadProduct();
        },
        error: (err) => (this.actionOption = true),
      });
    }
  }

  testUpdate(event: boolean) {
    this.showform = event;
  }

  updateForm($event: FormGroup) {
    this.service.updateProduct($event).subscribe({
      next: (res) => {
        this.loadProduct();
      },
      error: (err) => (this.actionOption = true),
    });
  }
}
