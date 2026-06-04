import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';
import { CreateBoardDto } from '../../../models/kanban.types';

@Component({
  selector: 'app-add-board-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-board-modal.html',
  styleUrl: './add-board-modal.css',
})
export class AddBoardModal {
  kanbanService = inject(KanbanService);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    columns: new FormArray<FormGroup>([]),
  });

  constructor() {
    this.addColumn();
    this.addColumn();
    this.addColumn();
  }

  get columnsArray() {
    return this.form.get('columns') as FormArray;
  }

  addColumn() {
    this.columnsArray.push(
      new FormGroup({
        name: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    );
  }

  removeColumn(index: number) {
    this.columnsArray.removeAt(index);
  }

  close() {
    this.kanbanService.closeAddBoardModal();
  }

  createBoard() {
    if (this.form.invalid) return;

    const value = this.form.getRawValue() as CreateBoardDto;

    this.kanbanService.addBoard(value);

    this.close();
    this.form.reset();
    this.columnsArray.clear();
  }
}
