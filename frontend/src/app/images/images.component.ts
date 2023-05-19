import { ChangeDetectionStrategy, Component } from '@angular/core';
import { gallery } from '../gallery/gallery.data';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent {

  constructor(private windowsService : WindowsService) { }

  images = [...gallery]

  onOpenImage(image : any) {
    this.windowsService.openImage(image)
  }

  onOpenMob(image : any) {
    if (this.windowsService.isMobile()) this.windowsService.openImage(image)
  }
}
