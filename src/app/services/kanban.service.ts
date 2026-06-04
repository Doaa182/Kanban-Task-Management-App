import { Injectable, computed, signal } from '@angular/core';
import { SAMPLE_DATA } from '../data/sample-data';
import {
  BoardType,
  CreateBoardDto,
  CreateTaskDto,
  TaskType,
  UpdateBoardDto,
  UpdateTaskDto,
} from '../models/kanban.types';

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

  //edit task
  isEditTaskModalOpenSignal = signal<boolean>(false);
  selectedTaskIdForEditSignal = signal<string | null>(null);

  openEditTaskModal(taskId: string) {
    this.selectedTaskIdForEditSignal.set(taskId);
    this.isEditTaskModalOpenSignal.set(true);
  }

  closeEditTaskModal() {
    this.isEditTaskModalOpenSignal.set(false);
    this.selectedTaskIdForEditSignal.set(null);
  }

  selectedTaskForEditSignal = computed(() => {
    const taskId = this.selectedTaskIdForEditSignal();

    if (!taskId) return null;

    return (
      this.activeBoardSignal()
        .columns.flatMap((c) => c.tasks)
        .find((t) => t.id === taskId) ?? null
    );
  });

  updateTask(taskId: string, update: UpdateTaskDto) {
    const updatedBoards = this.boardsSignal().map((board) => {
      return {
        ...board,
        columns: board.columns.map((col) => {
          const filteredTasks = col.tasks.filter((t) => t.id !== taskId);

          const isTargetColumn = col.name === update.status;

          if (!isTargetColumn) {
            return {
              ...col,
              tasks: filteredTasks,
            };
          }

          const updatedTask: TaskType = {
            id: taskId,
            title: update.title,
            description: update.description,
            status: update.status,
            subtasks: update.subtasks.map((s) => ({
              id: s.id ?? crypto.randomUUID(),
              title: s.title,
              isCompleted: s.isCompleted,
            })),
          };

          return {
            ...col,
            tasks: [...filteredTasks, updatedTask],
          };
        }),
      };
    });

    this.boardsSignal.set(updatedBoards);
  }

  //add board
  isAddBoardModalOpenSignal = signal<boolean>(false);

  openAddBoardModal() {
    this.isAddBoardModalOpenSignal.set(true);
  }

  closeAddBoardModal() {
    this.isAddBoardModalOpenSignal.set(false);
  }

  addBoard(dto: CreateBoardDto) {
    const newBoard: BoardType = {
      id: crypto.randomUUID(),
      name: dto.name,
      columns: dto.columns.map((c) => ({
        id: crypto.randomUUID(),
        name: c.name,
        tasks: [],
      })),
    };

    this.boardsSignal.update((boards) => [...boards, newBoard]);

    this.activeBoardIdSignal.set(newBoard.id);
  }

  //edit board

  isEditBoardModalOpenSignal = signal<boolean>(false);

  selectedBoardIdForEditSignal = signal<string | null>(null);

  openEditBoardModal(boardId: string) {
    this.selectedBoardIdForEditSignal.set(boardId);
    this.isEditBoardModalOpenSignal.set(true);
  }

  closeEditBoardModal() {
    this.selectedBoardIdForEditSignal.set(null);
    this.isEditBoardModalOpenSignal.set(false);
  }

  selectedBoardForEditSignal = computed(() => {
    const boardId = this.selectedBoardIdForEditSignal();

    if (!boardId) {
      return null;
    }

    return this.boardsSignal().find((board) => board.id === boardId) ?? null;
  });

  updateBoard(boardId: string, dto: UpdateBoardDto) {
    const updatedBoards = this.boardsSignal().map((board) => {
      if (board.id !== boardId) {
        return board;
      }

      const updatedColumns = dto.columns.map((columnDto) => {
        const existingColumn = board.columns.find((column) => column.id === columnDto.id);

        return {
          id: columnDto.id ?? crypto.randomUUID(),
          name: columnDto.name,
          tasks:
            existingColumn?.tasks.map((task) => ({
              ...task,
              status: columnDto.name,
            })) ?? [],
        };
      });

      return {
        ...board,
        name: dto.name,
        columns: updatedColumns,
      };
    });

    this.boardsSignal.set(updatedBoards);
  }
}
