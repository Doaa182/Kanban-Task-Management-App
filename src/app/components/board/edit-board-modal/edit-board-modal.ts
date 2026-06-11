import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';
import { BoardService } from '../../../services/board.service';
import { ConfirmModalService } from '../../../services/confirm-modal.service';
import { UiService } from '../../../services/ui.service';

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
  uiService = inject(UiService);

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

  removeColumnField(index: number) {
    const columnTaskCount =
      this.kanbanService.activeBoardSignal().columns[index]?.tasks.length ?? 0;

    this.confirmModalService.openConfirmModal(
      {
        title: 'Delete Column',

        message:
          columnTaskCount > 0
            ? `This column contains ${columnTaskCount} task(s). Are you sure you want to delete it?`
            : 'Are you sure you want to delete this column?',
      },
      () => {
        this.columnsArray.removeAt(index);
      },
    );
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

    if (this.boardService.isBoardNameDuplicated(value.name, this.board.id)) {
      this.form.controls.name.setErrors({
        ...this.form.controls.name.errors,
        duplicate: true,
      });

      this.form.controls.name.markAsTouched();

      return;
    }

    if (this.markDuplicateCols()) return;

    this.boardService.updateBoard(this.board.id, {
      name: value.name,
      columns: value.columns.map((column) => ({
        id: column.id ?? undefined,
        name: column.name,
      })),
    });

    this.closeModal();
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

  deleteBoard() {
    if (this.kanbanService.boardCountSignal() <= 1) {
      return;
    }

    const taskCount = this.board.columns.reduce((total, column) => total + column.tasks.length, 0);

    this.confirmModalService.openConfirmModal(
      {
        title: 'Delete Board',
        message:
          taskCount > 0
            ? `This board contains ${taskCount} task(s). Are you sure you want to delete it?`
            : 'Are you sure you want to delete this board?',
      },
      () => {
        this.boardService.deleteBoard(this.board.id);
        this.closeModal();
      },
    );
  }
}
