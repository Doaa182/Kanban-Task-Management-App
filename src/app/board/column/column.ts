import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnType, TaskType } from '../../models/kanban.types';
import { TaskCard } from '../task/task-card/task-card';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  @Input() column!: ColumnType;

  @Output() taskSelected = new EventEmitter<TaskType>();

  selectTask(task: TaskType) {
    this.taskSelected.emit(task);
  }
}
