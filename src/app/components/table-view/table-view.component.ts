import { PeriodicElement } from './../../models/api.model';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceStore } from '../../store/data-source.service';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {
  private dataSource = inject(DataSourceStore);

  dataElements!: PeriodicElement[];

  ngOnInit() {
    this.dataElements = this.dataSource.loadDataElements();
  }
}
