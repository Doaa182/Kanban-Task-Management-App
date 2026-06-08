import { inject, Injectable } from '@angular/core';
import { KanbanService } from './kanban.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  kanbanService = inject(KanbanService);

  openAddColumnModal() {
    this.kanbanService.isAddColumnModalOpenSignal.set(true);
  }

  closeAddColumnModal() {
    this.kanbanService.isAddColumnModalOpenSignal.set(false);
  }

  addColumn(boardId: string, columnName: string) {
    const updatedBoards = this.kanbanService.boardsSignal().map((board) => {
      if (board.id !== boardId) return board;

      return {
        ...board,
        columns: [
          ...board.columns,
          {
            id: crypto.randomUUID(),
            name: columnName,
            tasks: [],
          },
        ],
      };
    });

    this.kanbanService.boardsSignal.set(updatedBoards);
  }
}
