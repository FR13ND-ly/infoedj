import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setInFront } from '../state/windows/windows.actions';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent implements AfterViewInit {

  constructor(private store: Store<any>, private windowsService : WindowsService) { }

  windows$ = this.store.select('windows')
  minimizeds$ = this.store.select('minimizeds')

  @Input() name! : string
  @Input() showName! : string
  fullscreen : boolean = false

  navigationPaneItems = [
    {
      showName : 'Downloads',
      name : 'downloads',
      imageUrl : 'assets/icons/downloads.png'
    },
    {
      showName : 'Images',
      name : 'images',
      imageUrl : 'assets/icons/image.png'
    },
    {
      showName : 'Disk Cy',
      name : 'disk-cy',
      imageUrl : 'assets/icons/disk-cy.png'
    }, 
    {
      showName : 'Disk D',
      name : 'disk-d',
      imageUrl : 'assets/icons/disk-d.png'
    },
  ]

  ngAfterViewInit(): void {
    let marginTop = Math.floor(Math.random() * 10);
    let marginLeft = Math.floor(Math.random() * 10) + 30
    let window: any = document.querySelector(`app-${this.name.toLowerCase()} .window`)
    window.style.transform = `translateX(${marginLeft}vw)` 
    window.style.transform += `translateY(${marginTop}vh)`
    if (this.windowsService.isMobile()) this.onFullScreen()
  }

  onClose() {
    this.windowsService.closeWindow(this.name)
  }

  onFullScreen() {
    if (this.windowsService.isMobile()) return
    if (this.isUnresizeble()) return
    this.fullscreen = !this.fullscreen
    document.querySelector(`app-${this.name.toLowerCase()} .window`)?.classList.toggle('fullscreen')
  }

  onMinimalize() {
    this.windowsService.minimize(this.name.toLowerCase())
  }

  onSetInFront() {
    this.windowsService.openWindow(this.name.toLowerCase())
  }

  onDragStart() {
    if (this.windowsService.isMobile()) return
    if (this.fullscreen) {
      this.fullscreen = false
      document.querySelector(`app-${this.name.toLowerCase()} .window`)?.classList.remove('fullscreen')
    }
  }

  onOpenNavigationPaneItem(item : string, e : MouseEvent) {
    if (item == this.name.toLowerCase()) return
    if (e.which != 2 && !['disk-cy', 'disk-d'].includes(item.toLowerCase())) this.windowsService.closeWindow(this.name)
    this.windowsService.openWindow(item)
  }

  isFolder() {
    return [
      'alumni',
      'documents',
      'events',
      'gallery',
      'images',
      'downloads',
      'team',
    ].includes(this.name.toLowerCase())
  }

  getImgUrl(name : string) {
    return this.windowsService.getIcon(name)
  }
  
  isUnresizeble() {
    return ['portfolio', 'event', 'access-denied', 'chess'].includes(this.name.toLowerCase()) 
  }
}
