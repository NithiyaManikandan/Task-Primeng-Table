import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/Model/field';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() productList: Product[] = [];
  @Input() cols: any[] = [];
  @Input() totalLength: number = 0;
  @Input() productLimit: number = 0;
  @Input() index: number = 0;
  @Input() rowsPerPageOption: number[] = [];
  @Input() pagination: boolean = false;
  @Output() pageIndex: EventEmitter<number> = new EventEmitter<number>();
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  constructor(private service: TableService) {}

  ngOnInit(): void {}
  deleteProduct(id: number) {
    this.action.emit({ id, option: 'delete' });
  }
  navigateToPage(tableInfo: any): void {
    this.pageIndex.emit(tableInfo);
  }
  getEditproductId(id: any) {
    this.action.emit({ id, option: 'update' });
  }
}
