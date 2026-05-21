import { Injectable, computed, signal } from '@angular/core';
import { SAMPLE_DATA } from '../data/sample-data';
import { BoardType } from '../models/kanban.types';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  boards = signal<BoardType[]>(SAMPLE_DATA.boards);

  activeBoardId = signal(this.boards()[0].id);

  activeBoard = computed(() => this.boards().find((board) => board.id === this.activeBoardId()));

  setActiveBoard(boardId: string) {
    this.activeBoardId.set(boardId);
  }
}
