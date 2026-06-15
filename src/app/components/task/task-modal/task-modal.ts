import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskType } from '../../../models/kanban.types';
import { KanbanService } from '../../../services/kanban.service';
import { TaskService } from '../../../services/task.service';
import { ConfirmModalService } from '../../../services/confirm-modal.service';
import { UiService } from '../../../services/ui.service';

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
  taskService = inject(TaskService);
  confirmModalService = inject(ConfirmModalService);
  uiService = inject(UiService);

  closeTaskModal(): void {
    this.closed.emit();
  }

  toggleSubtask(taskId: string, subtaskId: string): void {
    this.taskService.toggleSubtaskCompletion(taskId, subtaskId);
  }

  deleteTaskById(taskId: string): void {
    const subtasksCount = this.task.subtasks.length;

    this.confirmModalService.openConfirmModal(
      {
        title: 'Delete Task',
        message:
          subtasksCount > 0
            ? `This task contains ${subtasksCount} subtask(s). Are you sure you want to delete it?`
            : 'Are you sure you want to delete this task?',
      },
      () => {
        this.taskService.deleteTaskById(taskId);
        this.closeTaskModal();
        this.uiService.showToast('Task deleted successfully.', 'success');
      },
    );
  }

  changeTaskStatus(taskId: string, newStatus: string): void {
    this.taskService.moveTaskToCol(taskId, newStatus);
    this.uiService.showToast(`Task moved to ${newStatus} successfully.`, 'success');
  }

  onTaskStatusSelectionChange(event: Event, taskId: string) {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    this.changeTaskStatus(taskId, selectedStatus);
  }
}
