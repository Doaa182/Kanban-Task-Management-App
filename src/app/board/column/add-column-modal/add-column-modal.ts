import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';

@Component({
  selector: 'app-add-column-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-column-modal.html',
})
export class AddColumnModal {
  kanbanService = inject(KanbanService);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  close() {
    this.kanbanService.closeAddColumnModal();
  }

  submit() {
    if (this.form.invalid) return;

    this.kanbanService.addColumn(this.kanbanService.activeBoardSignal().id, this.form.value.name!);

    this.close();
  }
}
