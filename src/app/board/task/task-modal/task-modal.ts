import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskType } from '../../../models/kanban.types';
import { KanbanService } from '../../../services/kanban.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
})
export class TaskModal {
  @Input({ required: true }) task!: TaskType;

  @Output() closed = new EventEmitter<void>();

  kanbanService = inject(KanbanService);

  closeTaskModal(): void {
    this.closed.emit();
  }

  toggleSubtask(taskId: string, subtaskId: string): void {
    this.kanbanService.toggleSubtaskCompletion(taskId, subtaskId);
  }

  deleteTaskById(taskId: string): void {
    this.kanbanService.deleteTaskById(taskId);
    this.closeTaskModal();
  }

  changeTaskStatus(taskId: string, newStatus: string): void {
    this.kanbanService.moveTaskToCol(taskId, newStatus);
  }

  onTaskStatusSelectionChange(event: Event, taskId: string) {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    this.changeTaskStatus(taskId, selectedStatus);
  }
}
