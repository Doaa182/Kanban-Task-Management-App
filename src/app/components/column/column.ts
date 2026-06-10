import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskType } from '../../models/kanban.types';
import { TaskCard } from '../task/task-card/task-card';
import { KanbanService } from '../../services/kanban.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  kanbanService = inject(KanbanService);
  taskService = inject(TaskService);

  // @Input({ required: true }) column!: ColumnType;
  @Input({ required: true }) columnId!: string;

  columnColors = ['#49C4E5', '#8471F2', '#67E2AE', '#F28771', '#F2D771', '#E54980'];

  onTaskClick(task: TaskType) {
    // this.kanbanService.setSelectedTaskForModal(task);
    this.taskService.openTaskModal(task.id);
  }

  column = computed(() => {
    const board = this.kanbanService.activeBoardSignal();
    return board?.columns.find((c) => c.id === this.columnId)!;
  });

  getColumnColor(): string {
    const columns = this.kanbanService.activeBoardSignal().columns;

    const columnIndex = columns.findIndex((column) => column.id === this.columnId);

    return this.columnColors[columnIndex % this.columnColors.length];
  }
}
