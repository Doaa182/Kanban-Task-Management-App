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

  boardCountSignal = computed(() => this.boardsSignal().length);

  setActiveBoardById(boardId: string) {
    this.activeBoardIdSignal.set(boardId);
  }

  //task modal
  // selectedTaskForModalSignal = signal<TaskType | null>(null);

  // setSelectedTaskForModal(task: TaskType) {
  //   this.selectedTaskForModalSignal.set(task);
  // }

  selectedTaskIdForModalSignal = signal<string | null>(null);

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

  openTaskModal(taskId: string) {
    this.selectedTaskIdForModalSignal.set(taskId);
  }

  // closeTaskModal() {
  //   this.selectedTaskForModalSignal.set(null);
  // }

  closeTaskModal() {
    this.selectedTaskIdForModalSignal.set(null);
  }

  toggleSubtaskCompletion(taskId: string, subtaskId: string) {
    const boards = this.boardsSignal();

    const updatedBoards = boards.map((board) => ({
      ...board,
      columns: board.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => {
          if (task.id !== taskId) return task;

          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, isCompleted: !subtask.isCompleted }
                : subtask,
            ),
          };
        }),
      })),
    }));

    this.boardsSignal.set(updatedBoards);
  }

  deleteTaskById(taskId: string) {
    const updatedBoards = this.boardsSignal().map((board) => ({
      ...board,
      columns: board.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    }));

    this.boardsSignal.set(updatedBoards);
  }

  moveTaskToCol(taskId: string, targetColName: string) {
    const boards = this.boardsSignal();

    const updatedBoards = boards.map((board) => {
      const taskToMove = board.columns
        .flatMap((col) => col.tasks)
        .find((task) => task.id === taskId);

      if (!taskToMove) return board;

      const updatedColumns = board.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      }));

      return {
        ...board,
        columns: updatedColumns.map((col) =>
          col.name === targetColName
            ? { ...col, tasks: [...col.tasks, { ...taskToMove, status: targetColName }] }
            : col,
        ),
      };
    });

    this.boardsSignal.set(updatedBoards);
  }

  //light/dark theme
  isDarkThemeSignal = signal<boolean>(true);

  toggleTheme() {
    this.isDarkThemeSignal.update((value) => !value);
  }
}
