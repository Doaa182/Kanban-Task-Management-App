import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';
import { ColumnService } from '../../../services/column.service';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-add-column-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-column-modal.html',
})
export class AddColumnModal {
  kanbanService = inject(KanbanService);
  colService = inject(ColumnService);
  uiService = inject(UiService);

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

    const boardId = this.kanbanService.activeBoardSignal().id;
    const columnName = this.form.value.name!;

    if (this.colService.isColumnNameDuplicated(boardId, columnName)) {
      this.form.controls.name.setErrors({
        ...this.form.controls.name.errors,
        duplicate: true,
      });

      this.form.controls.name.markAsTouched();

      return;
    }

    this.colService.addColumn(boardId, columnName);

    this.close();
    this.uiService.showToast('Column added successfully.', 'success');
  }
}
