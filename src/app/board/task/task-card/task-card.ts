// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TaskType } from '../../models/kanban.types';

// @Component({
//   selector: 'app-task-card',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './task-card.html',
//   styleUrl: './task-card.css',
// })
// export class TaskCard {
//   @Input() task!: TaskType;
// }

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
  private _task = signal<TaskType | null>(null);

  @Input({ required: true })
  set task(value: TaskType) {
    this._task.set(value);
  }

  @Output() taskClicked = new EventEmitter<TaskType>();

  taskSignal: Signal<TaskType | null> = this._task.asReadonly();

  completedSubtasks = computed(() => {
    const task = this.taskSignal();
    return task ? task.subtasks.filter((s) => s.isCompleted).length : 0;
  });

  onTaskClick() {
    const task = this.taskSignal();

    if (task) {
      this.taskClicked.emit(task);
    }
  }
}
