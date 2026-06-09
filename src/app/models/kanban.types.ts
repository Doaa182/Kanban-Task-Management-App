export interface SubtaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type CreateSubtaskDto = Omit<SubtaskType, 'id'>;

export interface UpdateSubtaskDto {
  id?: string;
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

export interface CreateTaskDto {
  title: string;
  description: string;
  status: string;
  subtasks: CreateSubtaskDto[];
}

export interface UpdateTaskDto {
  title: string;
  description: string;
  status: string;
  subtasks: UpdateSubtaskDto[];
}

export interface ColumnType {
  id: string;
  name: string;
  tasks: TaskType[];
}

export interface CreateColumnDto {
  name: string;
}

export interface UpdateColumnDto {
  id?: string;
  name: string;
}

export interface BoardType {
  id: string;
  name: string;
  columns: ColumnType[];
}

export interface CreateBoardDto {
  name: string;
  columns: CreateColumnDto[];
}

export interface UpdateBoardDto {
  name: string;
  columns: UpdateColumnDto[];
}

export interface ConfirmModalType {
  title: string;
  message: string;
}
