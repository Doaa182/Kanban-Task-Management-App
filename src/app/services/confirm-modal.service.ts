import { Injectable, signal } from '@angular/core';
import { ConfirmModalType } from '../models/kanban.types';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  isConfirmModalOpenSignal = signal(false);
  confirmModalDataSignal = signal<ConfirmModalType | null>(null);
  confirmModalActionCallback: (() => void) | null = null;

  openConfirmModal(data: ConfirmModalType, onConfirm: () => void) {
    this.confirmModalDataSignal.set(data);
    this.confirmModalActionCallback = onConfirm;
    this.isConfirmModalOpenSignal.set(true);
  }

  confirm() {
    this.confirmModalActionCallback?.();
    this.closeConfirmModal();
  }

  closeConfirmModal() {
    this.isConfirmModalOpenSignal.set(false);
    this.confirmModalDataSignal.set(null);
    this.confirmModalActionCallback = null;
  }
}
