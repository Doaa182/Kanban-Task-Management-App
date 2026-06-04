import { Injectable, computed, signal } from '@angular/core';
import { SAMPLE_DATA } from '../data/sample-data';
import { BoardType, CreateTaskDto, TaskType } from '../models/kanban.types';

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

  //add new task
  // addNewTaskToBoard(input: {
  //   title: string;
  //   description: string;
  //   subtasks: { id: string; title: string; isCompleted: boolean }[];
  //   status: string;
  // }) {
  //   const updatedBoards = this.boardsSignal().map((board) => {
  //     return {
  //       ...board,
  //       columns: board.columns.map((column) => {
  //         if (column.name !== input.status) return column;

  //         const newTask = {
  //           id: crypto.randomUUID(),
  //           title: input.title,
  //           description: input.description,
  //           status: input.status,
  //           subtasks: input.subtasks,
  //         };

  //         return {
  //           ...column,
  //           tasks: [...column.tasks, newTask],
  //         };
  //       }),
  //     };
  //   });

  //   this.boardsSignal.set(updatedBoards);
  // }

  addTask(createTaskDto: CreateTaskDto) {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      subtasks: createTaskDto.subtasks.map((subtask) => ({
        id: crypto.randomUUID(),
        title: subtask.title,
        isCompleted: false,
      })),
    };

    const updatedBoards = this.boardsSignal().map((board) => {
      return {
        ...board,
        columns: board.columns.map((column) => {
          if (column.name !== createTaskDto.status) return column;

          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }),
      };
    });

    this.boardsSignal.set(updatedBoards);
  }

  isAddTaskModalOpenSignal = signal<boolean>(false);

  openAddTaskModal() {
    this.isAddTaskModalOpenSignal.set(true);
  }

  closeAddTaskModal() {
    this.isAddTaskModalOpenSignal.set(false);
  }
}
