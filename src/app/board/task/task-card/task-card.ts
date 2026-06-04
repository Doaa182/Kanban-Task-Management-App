import { Component, Input, computed, signal, Signal, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskType } from '../../../models/kanban.types';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input({ required: true }) task!: TaskType;

  @Output() taskClicked = new EventEmitter<TaskType>();

  completedSubtasksCount = computed(() => this.task.subtasks.filter((s) => s.isCompleted).length);

  onTaskClick() {
    this.taskClicked.emit(this.task);
  }
}
