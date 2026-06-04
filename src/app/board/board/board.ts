import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardType, TaskType } from '../../models/kanban.types';
import { Column } from '../column/column';
import { TaskModal } from '../task/task-modal/task-modal';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, Column, TaskModal],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  @Input() board!: BoardType;

  selectedTask: TaskType | null = null;

  openTask(task: TaskType) {
    this.selectedTask = task;
  }
}
