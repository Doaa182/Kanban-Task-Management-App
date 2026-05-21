import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnType } from '../../models/kanban.types';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  @Input() column!: ColumnType;
}
