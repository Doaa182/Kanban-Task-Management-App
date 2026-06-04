import { Component, inject } from '@angular/core';
import { Board } from './board/board/board';
import { KanbanService } from './services/kanban.service';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Board],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  kanbanService = inject(KanbanService);
}
