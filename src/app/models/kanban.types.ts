export interface SubtaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type CreateSubtaskDto = Omit<SubtaskType, 'id'>;

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskType[];
}

export type CreateTaskDto = {
  title: string;
  description: string;
  status: string;
  subtasks: CreateSubtaskDto[];
};

export type UpdateTaskDto = {
  title: string;
  description: string;
  status: string;
  subtasks: {
    id?: string;
    title: string;
    isCompleted: boolean;
  }[];
};

export interface ColumnType {
  id: string;
  name: string;
  tasks: TaskType[];
}

export type CreateColumnDto = {
  name: string;
};

export interface BoardType {
  id: string;
  name: string;
  columns: ColumnType[];
}

export type CreateBoardDto = {
  name: string;
  columns: CreateColumnDto[];
};

export type UpdateBoardDto = {
  name: string;
  columns: {
    id?: string;
    name: string;
  }[];
};
