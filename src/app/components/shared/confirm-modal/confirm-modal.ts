import { Component, inject } from '@angular/core';
import { ConfirmModalService } from '../../../services/confirm-modal.service';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  confirmModalService = inject(ConfirmModalService);
}
