import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PeriodicElement } from '../../models/api.model';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  @Input() element!: PeriodicElement;
  @Output() updated = new EventEmitter<PeriodicElement>();

  emitUpdate() {
    this.updated.emit(this.element);
  }
}
