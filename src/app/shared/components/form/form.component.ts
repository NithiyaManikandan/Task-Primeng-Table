import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Model/field';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnChanges {
  @Input() actionData: Product[] = [];
  @Output() formReseted = new EventEmitter<boolean>();
  @Output() UpdatedData = new EventEmitter<any>();
  pro: Product[] = [];
  form = new FormGroup({});
  formResetClicked: boolean = false;
  constructor() {}
  ngOnChanges(): void {
    this.getdata();
  }

  getdata() {
    for (const x in this.actionData) {
      this.form.addControl(x, new FormControl('', Validators.required));
    }
    this.editData(this.actionData);
    this.onReset();
  }

  editData(res: Product[]) {
    for (const x in res) {
      this.form.patchValue({
        [x]: res[x],
      });
    }
  }

  updateForm(form: FormGroup<{}>) {
    this.UpdatedData.emit(form.value)
    this.onReset();
  }

  onReset() {
    this.formResetClicked = !this.formResetClicked;
    this.formReseted.emit(this.formResetClicked);
  }
}
