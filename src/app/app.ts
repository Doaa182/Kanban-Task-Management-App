import { Component, inject, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { SAMPLE_DATA } from './data/sample-data';
// import { BoardType } from './models/kanban.types';
import { Sidebar } from './layout/sidebar/sidebar';
import { Board } from './board/board/board';
import { KanbanService } from './services/kanban.service';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, Sidebar, Board],
  imports: [Sidebar, Board],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // readonly data = SAMPLE_DATA;

  // activeBoard = signal<BoardType>(this.data.boards[0]);

  // setActiveBoard(board: BoardType) {
  //   this.activeBoard.set(board);
  // }

  service = inject(KanbanService);
}
