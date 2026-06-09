import { inject, Injectable } from '@angular/core';
import { KanbanService } from './kanban.service';
import { CreateTaskDto, TaskType, UpdateTaskDto } from '../models/kanban.types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  kanbanService = inject(KanbanService);

  openTaskModal(taskId: string) {
    this.kanbanService.selectedTaskIdForModalSignal.set(taskId);
  }

  closeTaskModal() {
    this.kanbanService.selectedTaskIdForModalSignal.set(null);
  }

  toggleSubtaskCompletion(taskId: string, subtaskId: string) {
    const boards = this.kanbanService.boardsSignal();

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

    this.kanbanService.boardsSignal.set(updatedBoards);
  }

  deleteTaskById(taskId: string) {
    const updatedBoards = this.kanbanService.boardsSignal().map((board) => ({
      ...board,
      columns: board.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      })),
    }));

    this.kanbanService.boardsSignal.set(updatedBoards);
  }

  moveTaskToCol(taskId: string, targetColName: string) {
    const boards = this.kanbanService.boardsSignal();

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

    this.kanbanService.boardsSignal.set(updatedBoards);
  }

  //add new task
  openAddTaskModal() {
    const activeBoard = this.kanbanService.activeBoardSignal();

    if (!activeBoard || activeBoard.columns.length === 0) {
      this.kanbanService.showToast('You need at least one column before adding a task.');
      return;
    }

    this.kanbanService.isAddTaskModalOpenSignal.set(true);
  }

  closeAddTaskModal() {
    this.kanbanService.isAddTaskModalOpenSignal.set(false);
  }

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

    const updatedBoards = this.kanbanService.boardsSignal().map((board) => {
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

    this.kanbanService.boardsSignal.set(updatedBoards);
  }

  //edit task
  openEditTaskModal(taskId: string) {
    this.kanbanService.selectedTaskIdForEditSignal.set(taskId);
    this.kanbanService.isEditTaskModalOpenSignal.set(true);
  }

  closeEditTaskModal() {
    this.kanbanService.isEditTaskModalOpenSignal.set(false);
    this.kanbanService.selectedTaskIdForEditSignal.set(null);
  }

  updateTask(taskId: string, update: UpdateTaskDto) {
    const updatedBoards = this.kanbanService.boardsSignal().map((board) => {
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

    this.kanbanService.boardsSignal.set(updatedBoards);
  }
}
