export interface SubtaskType {
  title: string;
  isCompleted: boolean;
}

export interface TaskType {
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskType[];
}

export interface ColumnType {
  name: string;
  tasks: TaskType[];
}

export interface BoardType {
  name: string;
  columns: ColumnType[];
}
