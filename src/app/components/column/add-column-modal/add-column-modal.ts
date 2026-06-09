import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';
import { ColumnService } from '../../../services/column.service';

@Component({
  selector: 'app-add-column-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-column-modal.html',
})
export class AddColumnModal {
  kanbanService = inject(KanbanService);
  colService = inject(ColumnService);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  close() {
    this.colService.closeAddColumnModal();
  }

  submit() {
    if (this.form.invalid) return;

    this.colService.addColumn(this.kanbanService.activeBoardSignal().id, this.form.value.name!);

    this.close();
  }
}
