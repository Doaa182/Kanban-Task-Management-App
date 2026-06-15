import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';
import { UpdateTaskDto } from '../../../models/kanban.types';
import { TaskService } from '../../../services/task.service';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task-modal.html',
  styleUrl: './edit-task-modal.css',
})
export class EditTaskModal {
  kanbanService = inject(KanbanService);
  taskService = inject(TaskService);
  uiService = inject(UiService);

  task = this.kanbanService.selectedTaskForEditSignal;

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl('', { nonNullable: true, validators: [Validators.required] }),

    subtasks: new FormArray<FormGroup>([]),
  });

  constructor() {
    effect(() => {
      const task = this.task();

      if (!task) {
        this.form.reset();
        this.subtasksArray.clear();
        return;
      }

      this.form.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
      });

      this.subtasksArray.clear();

      task.subtasks.forEach((s) => {
        this.subtasksArray.push(
          new FormGroup({
            id: new FormControl<string | null>(s.id),
            title: new FormControl(s.title, Validators.required),
            isCompleted: new FormControl(s.isCompleted),
          }),
        );
      });
    });
  }

  get subtasksArray() {
    return this.form.get('subtasks') as FormArray;
  }

  close() {
    this.taskService.closeEditTaskModal();
  }

  addSubtask() {
    this.subtasksArray.push(
      new FormGroup({
        id: new FormControl<string | null>(null),
        title: new FormControl('', Validators.required),
        isCompleted: new FormControl(false),
      }),
    );
  }

  removeSubtask(i: number) {
    this.subtasksArray.removeAt(i);
  }

  save() {
    if (this.form.invalid || !this.task()) return;

    const value = this.form.getRawValue() as UpdateTaskDto;

    this.taskService.updateTask(this.task()!.id, value);

    this.close();
    this.uiService.showToast('Task updated successfully.', 'success');
  }
}
