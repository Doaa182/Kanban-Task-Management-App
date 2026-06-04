import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnType, TaskType } from '../../models/kanban.types';
import { TaskCard } from '../task/task-card/task-card';
import { KanbanService } from '../../services/kanban.service';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  kanbanService = inject(KanbanService);

  @Input({ required: true }) column!: ColumnType;

  onTaskClick(task: TaskType) {
    this.kanbanService.setSelectedTaskForModal(task);
  }
}
