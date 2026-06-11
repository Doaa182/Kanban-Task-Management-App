import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBoardDto } from '../../../models/kanban.types';
import { BoardService } from '../../../services/board.service';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-add-board-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-board-modal.html',
  styleUrl: './add-board-modal.css',
})
export class AddBoardModal {
  boardService = inject(BoardService);
  uiService = inject(UiService);

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
    this.boardService.closeAddBoardModal();
  }

  createBoard() {
    if (this.form.invalid) return;

    const value = this.form.getRawValue() as CreateBoardDto;
    if (this.boardService.isBoardNameDuplicated(value.name)) {
      this.form.controls.name.setErrors({
        ...this.form.controls.name.errors,
        duplicate: true,
      });

      this.form.controls.name.markAsTouched();

      return;
    }

    if (this.markDuplicateCols()) {
      return;
    }

    this.boardService.addBoard(value);

    this.close();
    this.form.reset();
    this.columnsArray.clear();
  }

  markDuplicateCols(): boolean {
    const seen = new Set<string>();
    let hasDuplicate = false;

    for (const group of this.columnsArray.controls) {
      const control = group.get('name');
      const value = control?.value?.trim().toLowerCase();

      if (!value) continue;

      if (seen.has(value)) {
        control?.setErrors({
          ...control.errors,
          duplicate: true,
        });

        control?.markAsTouched();

        hasDuplicate = true;
      } else {
        seen.add(value);
      }
    }

    return hasDuplicate;
  }
}
