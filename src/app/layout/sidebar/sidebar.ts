import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardType } from '../../models/kanban.types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() boards: BoardType[] = [];

  @Output() boardSelected = new EventEmitter<BoardType>();

  selectBoard(board: BoardType) {
    this.boardSelected.emit(board);
  }
}
