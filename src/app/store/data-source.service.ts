import { computed, Injectable, signal } from '@angular/core';
import { PeriodicElement } from '../models/api.model';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Injectable({
  providedIn: 'root',
})
export class DataSourceStore {
  private storeDataElements = signal<PeriodicElement[]>([]);
  private filterQuery = signal<string>('');

  readonly computedDataElements = computed(() => this.storeDataElements());
  readonly filteredDataElements = computed(() => {
    const lowerCaseQuery = this.filterQuery().toLowerCase();
    if (!lowerCaseQuery) return this.storeDataElements();

    return this.storeDataElements().filter((el) =>
      Object.values(el).join(' ').toLowerCase().includes(lowerCaseQuery)
    );
  });
  loadDataElements() {
    setTimeout(() => this.storeDataElements.set(ELEMENT_DATA), 1500);
  }
  setFilterQuery(query: string) {
    this.filterQuery.set(query);
  }
}
