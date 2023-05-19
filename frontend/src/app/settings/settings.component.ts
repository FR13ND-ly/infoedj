import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private userService : UserService) { }

  backgroundImages = [
    "/assets/bg/bg-1.webp",
    "/assets/bg/bg-2.webp",
  ]

  colors = [
    "#00bcd4",
    "#4caf50",
    "#f44336",
    "#2196f3",
    "#9c27b0",
    "#ff9800"
  ]

  user$ : any = this.userService.getUserUpdateListener()

  selectedColor = parseInt(localStorage.getItem('color')!)
  selectedBackgroundImage = parseInt(localStorage.getItem('bg')!)

  onLogin() {
    this.userService.login()
  }

  onLogout() {
    this.userService.logout()
  }

  onChangeTheme() {
    localStorage.setItem(
      'theme',
      !localStorage.getItem('theme') ? 'dark-theme' : ''
    );
    localStorage.setItem(
      'icons',
      !localStorage.getItem('theme') ? '' : 'dark/'
    );
    this.onSetTheme();
  }

  onSetTheme() {
    document.body.classList.toggle(
      'dark-theme',
      !!localStorage.getItem('theme')
    );
  }

  onSetBackgroundImage(index : number) {
    this.selectedBackgroundImage = index;
    [1, 2, 3, 4, 5].forEach((i) => {
      document.body.classList.remove(`background-image-${i}`)  
    })
    document.body.classList.add(`background-image-${index}`)
    localStorage.setItem(
      'bg', index.toString()
    );
  }

  onSetPrimaryColor(index : number) {
    this.selectedColor = index;
    [1, 2, 3, 4, 5].forEach((i) => {
      document.body.classList.remove(`primary-color-${i}`)  
    })
    document.body.classList.add(`primary-color-${index}`)
    localStorage.setItem(
      'color', index.toString()
    );
  }

  onResetFoldersPosition() {
    document.querySelectorAll('.app').forEach((el : any) => {
      el.style.transform = ''
      localStorage.setItem(el.dataset['app'] + 'Pos', '')
    })
  }

}
