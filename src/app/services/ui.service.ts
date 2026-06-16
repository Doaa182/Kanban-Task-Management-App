import { effect, Injectable, signal } from '@angular/core';

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

  //sidebar (mobile screen)

  isMobileSidebarOpenSignal = signal(false);

  toggleMobileSidebar() {
    this.isMobileSidebarOpenSignal.update((value) => !value);
  }

  openMobileSidebar() {
    this.isMobileSidebarOpenSignal.set(true);
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpenSignal.set(false);
  }

  //light/dark theme
  isDarkThemeSignal = signal<boolean>(true);

  constructor() {
    const storedTheme = localStorage.getItem('last-theme');

    if (storedTheme) {
      this.isDarkThemeSignal.set(storedTheme === 'dark');
    }

    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDarkThemeSignal());

      localStorage.setItem('last-theme', this.isDarkThemeSignal() ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.isDarkThemeSignal.update((value) => !value);
  }

  //toast
  toastMsgSignal = signal<string | null>(null);
  toastMsgTypeSignal = signal<string | null>(null);

  showToast(msg: string, msgType: string) {
    this.toastMsgSignal.set(msg);
    this.toastMsgTypeSignal.set(msgType);
    setTimeout(() => {
      this.toastMsgSignal.set(null);
    }, 5000);
  }

  //menu
  isBoardMenuOpen = signal(false);
  isTaskMenuOpen = signal(false);

  toggleBoardMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isBoardMenuOpen.update((value) => !value);
  }

  toggleTaskMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isTaskMenuOpen.update((value) => !value);
  }

  closeBoardMenu() {
    this.isBoardMenuOpen.set(false);
  }

  closeTaskMenu() {
    this.isTaskMenuOpen.set(false);
  }
}
