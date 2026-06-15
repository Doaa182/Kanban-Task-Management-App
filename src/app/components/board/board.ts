import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from '../column/column';
import { KanbanService } from '../../services/kanban.service';
import { TaskModal } from '../task/task-modal/task-modal';
import { AddTaskModal } from '../task/add-task-modal/add-task-modal';
import { EditTaskModal } from '../task/edit-task-modal/edit-task-modal';
import { AddBoardModal } from './add-board-modal/add-board-modal';
import { EditBoardModal } from './edit-board-modal/edit-board-modal';
import { AddColumnModal } from '../column/add-column-modal/add-column-modal';
import { TaskService } from '../../services/task.service';
import { ColumnService } from '../../services/column.service';
import { ConfirmModal } from '../shared/confirm-modal/confirm-modal';
import { UiService } from '../../services/ui.service';
import { BoardService } from '../../services/board.service';
import { ConfirmModalService } from '../../services/confirm-modal.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    Column,
    TaskModal,
    AddTaskModal,
    EditTaskModal,
    AddBoardModal,
    EditBoardModal,
    AddColumnModal,
    ConfirmModal,
  ],
  templateUrl: './board.html',
})
export class Board {
  kanbanService = inject(KanbanService);
  boardService = inject(BoardService);
  taskService = inject(TaskService);
  colService = inject(ColumnService);
  uiService = inject(UiService);
  confirmModalService = inject(ConfirmModalService);

  get currentBoard() {
    return this.kanbanService.activeBoardSignal();
  }

  editCurrentBoard() {
    this.boardService.openEditBoardModal(this.currentBoard.id);
  }

  deleteCurrentBoard() {
    if (this.kanbanService.boardCountSignal() <= 1) {
      this.uiService.showToast('You must keep at least one board.');
      return;
    }

    const taskCount = this.currentBoard.columns.reduce(
      (total, column) => total + column.tasks.length,
      0,
    );

    this.confirmModalService.openConfirmModal(
      {
        title: 'Delete Board',
        message:
          taskCount > 0
            ? `This board contains ${taskCount} task(s). Are you sure you want to delete it?`
            : 'Are you sure you want to delete this board?',
      },
      () => {
        this.boardService.deleteBoard(this.currentBoard.id);
        this.boardService.closeEditBoardModal();
      },
    );
  }
}
