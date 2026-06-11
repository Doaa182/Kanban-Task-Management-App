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

  isColumnNameDuplicated(boardId: string, name: string, ignoreId?: string): boolean {
    const board = this.kanbanService.boardsSignal().find((b) => b.id === boardId);
    if (!board) return false;

    return board.columns.some(
      (c) => c.name.trim().toLowerCase() === name.trim().toLowerCase() && c.id !== ignoreId,
    );
  }
}
