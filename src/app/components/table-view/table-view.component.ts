import { PeriodicElement } from './../../models/api.model';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceStore } from '../../store/data-source.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {
  private dataSource = inject(DataSourceStore);

  dataElements = this.dataSource.computedDataElements;
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {
    this.dataSource.loadDataElements();
  }
}
