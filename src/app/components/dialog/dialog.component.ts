import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { PeriodicElement } from '../../models/api.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  private dialogRef = inject(MatDialogRef<DialogComponent>);
  private fb = inject(FormBuilder);
  readonly form: FormGroup;

  constructor() {
    const data = inject(MAT_DIALOG_DATA);
    this.form = this.fb.group({
      position: [data.element.position, Validators.required],
      name: [data.element.name, Validators.required],
      weight: [data.element.weight, Validators.required],
      symbol: [data.element.symbol, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
