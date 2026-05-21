export interface SubtaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskType[];
}

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
