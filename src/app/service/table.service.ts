import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../Model/field';
@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  getAllProducts(productLimit: number, pageIndex: number) {
    return this.http.get('http://localhost:3000/products').pipe(
      map((res: any) => {
        let filteredProducts: any[] = [];
        filteredProducts = res.slice(
          pageIndex * productLimit,
          productLimit + pageIndex * productLimit
        );
        return { filteredProducts, res };
      })
    );
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductById(id: number) {
    return this.http.get<Product[]>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: any) {
    return this.http.put(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
}

//https://run.mocky.io/v3/4e90724f-eafc-49d5-a1cd-290f61f1378a
