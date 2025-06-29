import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceStore } from '../../store/data-source.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicElement } from '../../models/api.model';
import { DialogComponent } from '../dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {
  private dataSource = inject(DataSourceStore);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  readonly dataElements = this.dataSource.filteredDataElements;
  readonly isLoading = this.dataSource.isLoading;
  readonly displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
  ];
  readonly filterInputControl = new FormControl('');

  ngOnInit() {
    this.dataSource.loadDataElements();

    this.filterInputControl.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => {
        this.dataSource.setFilterQuery(value ? value : '');
      });
  }
  clearFilter() {
    this.filterInputControl.setValue('');
    this.dataSource.setFilterQuery('');
  }
  openEditDialog(element: PeriodicElement) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { element },
    });
    dialogRef.afterClosed().subscribe((updatedElement: PeriodicElement) => {
      if (updatedElement) {
        this.dataSource.updateElement(updatedElement);
        this.snackBar.open('Record updated!', 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }
}
