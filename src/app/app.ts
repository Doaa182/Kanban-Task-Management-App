import { Component, inject } from '@angular/core';
import { KanbanService } from './services/kanban.service';
import { Board } from './components/board/board';
import { Sidebar } from './components/sidebar/sidebar';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Board],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  kanbanService = inject(KanbanService);
  uiService = inject(UiService);
}
