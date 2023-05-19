import { Platform } from '@angular/cdk/platform';
import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { setEvent } from './state/event/event.actions';
import { setImage } from './state/image/image.actions';
import { setMember } from './state/member/member.actions';
import { maximizeWindow, minimizeWindow } from './state/minimizeds/minimizeds.actions';
import {
  addWindow,
  removeWindow,
  setInFront,
} from './state/windows/windows.actions';

@Injectable({
  providedIn: 'root',
})
export class WindowsService {
  
  static injector: Injector;
  minimizeds: any;

  constructor(private store: Store<any>, private platform : Platform, private _snackBar: MatSnackBar) {
    this.store.select('minimizeds').subscribe((m) => (this.minimizeds = m));
  }

  closeWindow(window: any) {
    let windowRef = document.querySelector(`app-${window} .window`)
    windowRef!.classList.add('close')
    timer(250).subscribe(() => {
      this.store.dispatch(removeWindow({ window: window.toLowerCase() }));
    })
  }

  openWindow(window: any): void {
    if (['disk-cy', 'disk-d'].includes(window)) {
      this._snackBar.open("Access Denied", "", {duration : 3000});
      return
    }
    if (this.minimizeds.includes(window)) {
      this.store.dispatch(maximizeWindow({ window }));
    } else {
      this.store.dispatch(addWindow({ window }));
    }
    this.store.dispatch(setInFront({ window }));
  }

  openImage(image: any) {
    this.openWindow('image');
    this.store.dispatch(setImage({ image }));
  }

  openEvent(event: any) {
    this.openWindow('event');
    this.store.dispatch(setEvent({ event }));
  }

  minimize(window : any) {
    let windowRef = document.querySelector(`app-${window} .window`)
    windowRef!.classList.remove('maximize')
    windowRef!.classList.add('minimize')
    timer(250).subscribe(() => {
      this.store.dispatch(minimizeWindow({window : window}))
    })
  }

  maximize(window : any) {
    let windowRef = document.querySelector(`app-${window} .window`)
    windowRef!.classList.remove('minimize')
    windowRef!.classList.add('maximize')
    timer(250).subscribe(() => {
      this.store.dispatch(maximizeWindow({window : window.toLowerCase()}))
    })
  }

  openPortfolio(portfolio: any) {
    this.openWindow('portfolio');
    this.store.dispatch(setMember({ member: portfolio }));
  }

  getIcon(name: string) {
    let theme = localStorage.getItem('icons') ?? ''
    switch (name.toLowerCase()) {
      case 'gallery':
      case 'team':
      case 'alumni':
      case 'events':
        return `assets/icons/${theme}folder.webp`;
      case 'images':
        return `assets/icons/${theme}image.webp`;
      case 'cl':
        return `assets/icons/${theme}cl.webp`;
      case 'documents':
        return `assets/icons/${theme}documents.webp`;
      case 'image':
        return `assets/icons/${theme}image.webp`;
      case 'portfolio':
        return `assets/icons/${theme}portfolio.webp`;
      case 'about':
        return `assets/icons/${theme}info.webp`;
      case 'event':
        return `assets/icons/${theme}event.webp`;
      case 'cyliis':
        return `assets/icons/${theme}cyliis.webp`;
      case 'downloads':
        return `assets/icons/${theme}downloads.webp`;
      case 'disk-cy':
        return `assets/icons/${theme}disk-cy.webp`;
      case 'disk-d':
        return `assets/icons/${theme}disk-d.webp`;
      case 'chess':
        return `assets/icons/chess.png`;
      case 'resolve':
        return `assets/icons/resolve.png`;
      case 'reviews':
        return `assets/icons/reviews.png`;
      default:
        return `assets/icons/${theme}settings.webp`;
    }
  }

  isMobile() {
    return this.platform.ANDROID || this.platform.IOS
  }
}
