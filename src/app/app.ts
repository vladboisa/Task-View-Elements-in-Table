import { Component } from '@angular/core';
import { TableViewComponent } from './components/table-view/table-view.component';

@Component({
  selector: 'app-root',
  imports: [TableViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Task';
}
