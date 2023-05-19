import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadsComponent {

  constructor(private windowsService : WindowsService) { }

  files = [
    {
      imageUrl : "/assets/icons/quiz.webp",
      name : 'Resolve'
    },
    {
      imageUrl : "/assets/icons/reviews.png",
      name : 'Reviews'
    }
  ]

  onOpen(name : any) {
    this.windowsService.openWindow(name.toLowerCase())
  }

  onOpenMob(member : string) {
    if (this.windowsService.isMobile()) this.windowsService.openWindow(member)
  }

}
