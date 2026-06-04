import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from '../column/column';
import { KanbanService } from '../../services/kanban.service';
import { TaskModal } from '../task/task-modal/task-modal';
import { AddTaskModal } from '../task/add-task-modal/add-task-modal';
import { EditTaskModal } from '../task/edit-task-modal/edit-task-modal';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, Column, TaskModal, AddTaskModal, EditTaskModal],
  templateUrl: './board.html',
})
export class Board {
  kanbanService = inject(KanbanService);
}
