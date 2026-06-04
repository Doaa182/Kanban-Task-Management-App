import { Component, inject } from '@angular/core';
import { KanbanService } from '../../../services/kanban.service';
import { CreateTaskDto } from '../../../models/kanban.types';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task-modal.html',
  styleUrl: './add-task-modal.css',
})
export class AddTaskModal {
  kanbanService = inject(KanbanService);

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl('Todo', { nonNullable: true, validators: [Validators.required] }),
    subtasks: new FormArray([
      new FormGroup({
        title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      }),
    ]),
  });

  get subtasksArray() {
    return this.form.get('subtasks') as FormArray;
  }

  closeAddTaskModal() {
    this.kanbanService.closeAddTaskModal();
  }

  addSubtaskField() {
    this.subtasksArray.push(
      new FormGroup({
        title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      }),
    );
  }

  removeSubtaskField(index: number) {
    this.subtasksArray.removeAt(index);
  }

  createTask() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: CreateTaskDto = {
      title: value.title,
      description: value.description,
      status: value.status,
      subtasks: value.subtasks.map((s) => ({
        title: s.title,
        isCompleted: false,
      })),
    };

    this.kanbanService.addTask(payload);

    this.closeAddTaskModal();
  }
}
