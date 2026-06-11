import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  //sidebar
  isSidebarOpenSignal = signal(true);

  toggleSidebar() {
    this.isSidebarOpenSignal.update((value) => !value);
  }

  openSidebar() {
    this.isSidebarOpenSignal.set(true);
  }

  closeSidebar() {
    this.isSidebarOpenSignal.set(false);
  }
}
