import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBoardDto } from '../../../models/kanban.types';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-add-board-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-board-modal.html',
  styleUrl: './add-board-modal.css',
})
export class AddBoardModal {
  boardService = inject(BoardService);

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

    this.boardService.addBoard(value);

    this.close();
    this.form.reset();
    this.columnsArray.clear();
  }
}
