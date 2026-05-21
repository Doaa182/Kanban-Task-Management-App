import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardType } from '../../models/kanban.types';
import { Column } from '../column/column';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, Column],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  @Input() board!: BoardType;
}
