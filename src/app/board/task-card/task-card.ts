import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskType } from '../../models/kanban.types';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input() task!: TaskType;
}
