import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanService } from '../../services/kanban.service';
import { BoardService } from '../../services/board.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  kanbanService = inject(KanbanService);
  boardService = inject(BoardService);
  uiService = inject(UiService);

  selectBoardById(boardId: string) {
    this.boardService.setActiveBoardById(boardId);
  }

  editCurrentBoard() {
    this.boardService.openEditBoardModal(this.kanbanService.activeBoardSignal().id);
  }
}
