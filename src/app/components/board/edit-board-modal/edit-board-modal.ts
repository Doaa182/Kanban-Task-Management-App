import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';
import { BoardService } from '../../../services/board.service';
import { ConfirmModalService } from '../../../services/confirm-modal.service';

@Component({
  selector: 'app-edit-board-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-board-modal.html',
})
export class EditBoardModal {
  kanbanService = inject(KanbanService);
  boardService = inject(BoardService);
  confirmModalService = inject(ConfirmModalService);

  board = this.kanbanService.activeBoardSignal();

  form = new FormGroup({
    name: new FormControl(this.board.name, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    columns: new FormArray(
      this.board.columns.map(
        (column) =>
          new FormGroup({
            id: new FormControl(column.id),
            name: new FormControl(column.name, {
              nonNullable: true,
              validators: [Validators.required],
            }),
          }),
      ),
    ),
  });

  get columnsArray() {
    return this.form.controls.columns;
  }

  addColumnField() {
    this.columnsArray.push(
      new FormGroup({
        id: new FormControl<string | null>(null),
        name: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    );
  }

  // removeColumnField(index: number) {
  //   if (this.columnsArray.length <= 1) return;

  //   this.columnsArray.removeAt(index);
  // }

  removeColumnField(index: number) {
    if (this.columnsArray.length <= 1) return;

    const columnTasks = this.kanbanService.activeBoardSignal().columns[index]?.tasks.length ?? 0;

    if (columnTasks > 0) {
      this.confirmModalService.openConfirmModal(
        {
          title: 'Delete Column',
          message: `This column contains ${columnTasks} task(s). Are you sure you want to delete it?`,
        },
        () => {
          this.columnsArray.removeAt(index);
        },
      );

      return;
    }

    this.columnsArray.removeAt(index);
  }

  closeModal() {
    this.boardService.closeEditBoardModal();
  }

  updateBoard() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.boardService.updateBoard(this.board.id, {
      name: value.name,
      columns: value.columns.map((column) => ({
        id: column.id ?? undefined,
        name: column.name,
      })),
    });

    this.closeModal();
  }

  deleteBoard() {
    if (this.kanbanService.boardCountSignal() <= 1) {
      return;
    }

    this.boardService.deleteBoard(this.board.id);

    this.closeModal();
  }
}
