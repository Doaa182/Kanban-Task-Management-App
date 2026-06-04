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

export interface ColumnType {
  id: string;
  name: string;
  tasks: TaskType[];
}

export interface BoardType {
  id: string;
  name: string;
  columns: ColumnType[];
}
