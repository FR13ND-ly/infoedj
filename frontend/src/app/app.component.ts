import { AfterContentInit, Component, OnInit } from '@angular/core';
import { delay, fromEvent, map, timer } from 'rxjs';
import { UserService } from './user.service';
import { WindowsService } from './windows.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private windowsService: WindowsService,
    private userService: UserService
  ) {}

  loaded: boolean = false;

  ngOnInit() { 
    this.onSetTheme();
    this.onSetBackgroundImage();
    this.onSetPrimaryColor();
    this.userService.init();
    fromEvent(document, 'keydown').subscribe((e: any) => {
      if (e.ctrlKey && e.altKey && e.key == 't')
        this.windowsService.openWindow('cl');
    });
    this.resolveUrl();
  }


  onBoot() {
    this.loaded = true;
    localStorage.setItem('boot', '1');
  }

  onSetTheme() {
    document.body.classList.toggle(
      'dark-theme',
      !!localStorage.getItem('theme')
    );
  }

  onSetBackgroundImage() {
    let index = +localStorage.getItem('bg')!;
    document.body.classList.add(`background-image-${index}`);
  }

  onSetPrimaryColor() {
    let index = +localStorage.getItem('color')!;
    document.body.classList.add(`primary-color-${index}`);
  }

  resolveUrl() {
    let paths = [...location.pathname.split('/')];
    paths.shift();
    if (
      [
        'gallery',
        'team',
        'alumni',
        'events',
        'documents',
        'images',
        'about',
        'cl',
        'settings',
      ].includes(paths[0])
    )
    this.windowsService.openWindow(paths[0]);
  }
}
