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
  taskService = inject(TaskService);
  colService = inject(ColumnService);
  uiService = inject(UiService);
}
