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

  //light/dark theme
  isDarkThemeSignal = signal<boolean>(true);

  toggleTheme() {
    this.isDarkThemeSignal.update((value) => !value);
  }

  //toast
  toastMsgSignal = signal<string | null>(null);

  showToast(msg: string) {
    this.toastMsgSignal.set(msg);

    console.log(msg);

    setTimeout(() => {
      this.toastMsgSignal.set(null);
    }, 5000);
  }
}
