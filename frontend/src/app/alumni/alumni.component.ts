import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowsService } from '../windows.service';
import { alumni } from './alumni.data';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlumniComponent {

  constructor(private windowsService : WindowsService) { }

  alumni = [...alumni]

  onOpen(member : any) {
    this.windowsService.openPortfolio(member)
  }

  onOpenMob(member : string) {
    if (this.windowsService.isMobile()) this.windowsService.openPortfolio(member)
  }

}
