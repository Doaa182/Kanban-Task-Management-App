import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanService } from '../services/kanban.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  kanbanService = inject(KanbanService);

  selectBoardById(boardId: string) {
    this.kanbanService.setActiveBoardById(boardId);
  }
}
