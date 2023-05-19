import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, timer, delay, filter } from 'rxjs';
import { UserService } from '../user.service';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-boot-screen',
  templateUrl: './boot-screen.component.html',
  styleUrls: ['./boot-screen.component.scss']
})
export class BootScreenComponent implements OnInit{

  constructor(private windowsService: WindowsService, private userService : UserService) { }

  @Output() boot = new EventEmitter()

  @Input() loadWindow! : boolean

  loading : any = [
    {
      action : () => this.content += '[       10.0.22000.978] The bits are breeding<br>'
    },
    {
      action : () => this.content += "[       10.0.22000.978] Making sure all the <wbr>i's have dots...<br>"
    },
    {
      action : () => this.content += '[       10.0.22000.978] Connecting Neurotoxin <wbr>Storage Tank...<br>'
    },
  ]

  content : string = `
[       10.0.22000.978] Loading<br>`
  async ngOnInit() {
    fromEvent(window, "load")
    .pipe(
      delay(1200),
      filter(() => !!localStorage.getItem('boot') || this.windowsService.isMobile())
    )
    .subscribe(() => {
      this.boot.emit()
    });
    this.loading.forEach((iteration : any, i : number) => {
      timer((i + 1) * 1000).subscribe(() => iteration.action())
    })
    timer(this.loading.length * 1000 + 2000).subscribe(() => this.onSkip())
  }

  onSkip() {
    this.boot.emit()
  }

  openOldSite() {
    location.href = "https://cyliis.ro"
  }
}
