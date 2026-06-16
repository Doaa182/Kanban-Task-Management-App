import { inject, Injectable } from '@angular/core';
import { KanbanService } from './kanban.service';
import { CreateTaskDto, TaskType, UpdateTaskDto } from '../models/kanban.types';
import { UiService } from './ui.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  kanbanService = inject(KanbanService);
  uiService = inject(UiService);

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
      let movedTask: TaskType | null = null;

      const cleanedColumns = board.columns.map((col) => {
        const task = col.tasks.find((t) => t.id === taskId);
        if (task) movedTask = task;

        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
        };
      });

      if (!movedTask) return board;

      return {
        ...board,
        columns: cleanedColumns.map((col) => {
          if (col.name !== targetColName) return col;

          return {
            ...col,
            tasks: [
              ...col.tasks,
              {
                ...movedTask!,
                status: targetColName,
              },
            ],
          };
        }),
      };
    });

    this.kanbanService.boardsSignal.set(updatedBoards);

    console.log('moveTaskToCol:', taskId, targetColName);
  }

  reorderTasks(columnId: string, previousIndex: number, currentIndex: number) {
    const updatedBoards = this.kanbanService.boardsSignal().map((board) => ({
      ...board,
      columns: board.columns.map((col) => {
        if (col.id !== columnId) return col;

        const tasks = [...col.tasks];

        moveItemInArray(tasks, previousIndex, currentIndex);

        return {
          ...col,
          tasks,
        };
      }),
    }));

    this.kanbanService.boardsSignal.set(updatedBoards);
  }

  openAddTaskModal() {
    const activeBoard = this.kanbanService.activeBoardSignal();

    if (!activeBoard || activeBoard.columns.length === 0) {
      this.uiService.showToast('You need at least one column before adding a task.', 'err');
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
          const taskIndex = col.tasks.findIndex((t) => t.id === taskId);
          const taskExists = taskIndex !== -1;

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

          if (taskExists) {
            const newTasks = [...filteredTasks];
            newTasks.splice(taskIndex, 0, updatedTask);

            return {
              ...col,
              tasks: newTasks,
            };
          }

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
