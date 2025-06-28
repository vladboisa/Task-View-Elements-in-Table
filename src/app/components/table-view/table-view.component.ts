import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceStore } from '../../store/data-source.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs';

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
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {
  private dataSource = inject(DataSourceStore);

  dataElements = this.dataSource.filteredDataElements;

  filterInputControl = new FormControl('');
  isLoading = this.dataSource.isLoading;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {
    this.dataSource.loadDataElements();

    this.filterInputControl.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => {
        this.dataSource.setFilterQuery(value ? value : '');
      });
  }
  openEditDialog(element: any) {
    console.log(element);
  }
}
