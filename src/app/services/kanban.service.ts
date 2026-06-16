import { Injectable, computed, effect, signal } from '@angular/core';
import { SAMPLE_DATA } from '../data/sample-data';
import { BoardType } from '../models/kanban.types';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  constructor() {
    const storedData = localStorage.getItem('kanban-data');

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      this.boardsSignal.set(parsedData.boards ?? []);
      this.activeBoardIdSignal.set(parsedData.activeBoardId ?? this.boardsSignal()[0]?.id);
    } else {
      this.boardsSignal.set(SAMPLE_DATA.boards);
      this.activeBoardIdSignal.set(SAMPLE_DATA.boards[0].id);
    }

    effect(() => {
      if (!this.boardsSignal().length) return;

      const kanbanData = {
        boards: this.boardsSignal(),
        activeBoardId: this.activeBoardIdSignal(),
      };

      localStorage.setItem('kanban-data', JSON.stringify(kanbanData));
    });
  }

  //board
  // boardsSignal = signal<BoardType[]>(SAMPLE_DATA.boards);
  // activeBoardIdSignal = signal<string>(this.boardsSignal()[0].id);

  boardsSignal = signal<BoardType[]>([]);
  activeBoardIdSignal = signal<string>('');

  isAddBoardModalOpenSignal = signal<boolean>(false);
  isEditBoardModalOpenSignal = signal<boolean>(false);
  selectedBoardIdForEditSignal = signal<string | null>(null);

  boardCountSignal = computed(() => this.boardsSignal().length);

  activeBoardSignal = computed(() => {
    return this.boardsSignal().find((board) => board.id === this.activeBoardIdSignal())!;
  });

  selectedBoardForEditSignal = computed(() => {
    const boardId = this.selectedBoardIdForEditSignal();

    if (!boardId) {
      return null;
    }

    return this.boardsSignal().find((board) => board.id === boardId) ?? null;
  });

  //task
  selectedTaskIdForModalSignal = signal<string | null>(null);
  isAddTaskModalOpenSignal = signal<boolean>(false);
  isEditTaskModalOpenSignal = signal<boolean>(false);
  selectedTaskIdForEditSignal = signal<string | null>(null);

  selectedTaskForModalSignal = computed(() => {
    const selectedTaskId = this.selectedTaskIdForModalSignal();

    if (!selectedTaskId) {
      return null;
    }

    return (
      this.activeBoardSignal()
        .columns.flatMap((column) => column.tasks)
        .find((task) => task.id === selectedTaskId) ?? null
    );
  });

  selectedTaskForEditSignal = computed(() => {
    const taskId = this.selectedTaskIdForEditSignal();

    if (!taskId) return null;

    return (
      this.activeBoardSignal()
        .columns.flatMap((c) => c.tasks)
        .find((t) => t.id === taskId) ?? null
    );
  });

  canAddTaskSignal = computed(() => {
    const board = this.activeBoardSignal();
    return board.columns.length > 0;
  });

  //add column
  isAddColumnModalOpenSignal = signal<boolean>(false);
}
