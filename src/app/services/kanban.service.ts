import { Injectable, computed, signal } from '@angular/core';
import { SAMPLE_DATA } from '../data/sample-data';
import { BoardType, TaskType } from '../models/kanban.types';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  //board
  boardsSignal = signal<BoardType[]>(SAMPLE_DATA.boards);
  activeBoardIdSignal = signal<string>(this.boardsSignal()[0].id);

  activeBoardSignal = computed(() => {
    return this.boardsSignal().find((board) => board.id === this.activeBoardIdSignal())!;
  });

  boardCount = computed(() => this.boardsSignal().length);

  setActiveBoardById(boardId: string) {
    this.activeBoardIdSignal.set(boardId);
  }

  //task modal
  selectedTaskForModalSignal = signal<TaskType | null>(null);

  setSelectedTaskForModal(task: TaskType) {
    this.selectedTaskForModalSignal.set(task);
  }

  closeTaskModal() {
    this.selectedTaskForModalSignal.set(null);
  }

  //light/dark theme
  isDarkThemeSignal = signal<boolean>(true);

  toggleTheme() {
    this.isDarkThemeSignal.update((value) => !value);
  }
}
