import { inject, Injectable } from '@angular/core';
import { KanbanService } from './kanban.service';
import { BoardType, CreateBoardDto, UpdateBoardDto } from '../models/kanban.types';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  kanbanService = inject(KanbanService);

  //active board
  setActiveBoardById(boardId: string) {
    this.kanbanService.activeBoardIdSignal.set(boardId);
  }

  //add board
  openAddBoardModal() {
    this.kanbanService.isAddBoardModalOpenSignal.set(true);
  }

  closeAddBoardModal() {
    this.kanbanService.isAddBoardModalOpenSignal.set(false);
  }

  addBoard(dto: CreateBoardDto) {
    const newBoard: BoardType = {
      id: crypto.randomUUID(),
      name: dto.name,
      columns: dto.columns.map((c) => ({
        id: crypto.randomUUID(),
        name: c.name,
        tasks: [],
      })),
    };

    this.kanbanService.boardsSignal.update((boards) => [...boards, newBoard]);

    this.kanbanService.activeBoardIdSignal.set(newBoard.id);
  }

  //edit board
  openEditBoardModal(boardId: string) {
    this.kanbanService.selectedBoardIdForEditSignal.set(boardId);
    this.kanbanService.isEditBoardModalOpenSignal.set(true);
  }

  closeEditBoardModal() {
    this.kanbanService.selectedBoardIdForEditSignal.set(null);
    this.kanbanService.isEditBoardModalOpenSignal.set(false);
  }

  updateBoard(boardId: string, dto: UpdateBoardDto) {
    const updatedBoards = this.kanbanService.boardsSignal().map((board) => {
      if (board.id !== boardId) {
        return board;
      }

      const updatedColumns = dto.columns.map((columnDto) => {
        const existingColumn = board.columns.find((column) => column.id === columnDto.id);

        return {
          id: columnDto.id ?? crypto.randomUUID(),
          name: columnDto.name,
          tasks:
            existingColumn?.tasks.map((task) => ({
              ...task,
              status: columnDto.name,
            })) ?? [],
        };
      });

      return {
        ...board,
        name: dto.name,
        columns: updatedColumns,
      };
    });

    this.kanbanService.boardsSignal.set(updatedBoards);
  }

  //delete board
  deleteBoard(boardId: string) {
    if (this.kanbanService.boardsSignal().length <= 1) {
      return;
    }

    const boards = this.kanbanService.boardsSignal();

    const deletedIndex = boards.findIndex((board) => board.id === boardId);

    const updatedBoards = boards.filter((board) => board.id !== boardId);

    this.kanbanService.boardsSignal.set(updatedBoards);

    const nextBoard =
      updatedBoards[deletedIndex] ?? updatedBoards[deletedIndex - 1] ?? updatedBoards[0];

    if (nextBoard) {
      this.kanbanService.activeBoardIdSignal.set(nextBoard.id);
    }
  }
}
