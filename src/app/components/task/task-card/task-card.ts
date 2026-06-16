import { Component, Input, computed, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskType } from '../../../models/kanban.types';
import { KanbanService } from '../../../services/kanban.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  kanbanService = inject(KanbanService);

  @Input({ required: true }) taskId!: string;

  @Output() taskClicked = new EventEmitter<TaskType>();

  task = computed(() => {
    return this.kanbanService
      .activeBoardSignal()
      ?.columns.flatMap((c) => c.tasks)
      .find((t) => t.id === this.taskId);
  });

  completedSubtasksCount = computed(() => {
    const task = this.task();
    return task ? task.subtasks.filter((s) => s.isCompleted).length : 0;
  });

  onTaskClick() {
    const task = this.task();
    if (task) {
      this.taskClicked.emit(task);
    }
  }
}
