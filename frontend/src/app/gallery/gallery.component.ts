import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowsService } from '../windows.service';
import { gallery } from './gallery.data';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {

  constructor(private windowsService : WindowsService) { }
  
  galleryItems = [...gallery]

  onOpenImage(image : any) {
    this.windowsService.openImage(image)
  }

  onOpenMob(image : any) {
    if (this.windowsService.isMobile()) this.windowsService.openImage(image)
  }
}
