import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowsService } from '../windows.service';
import { team } from './team.data';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {

  constructor(private windowsService : WindowsService) { }

  team = [...team]

  onOpen(member : any) {
    this.windowsService.openPortfolio(member)
  }

  onOpenMob(member : string) {
    if (this.windowsService.isMobile()) this.windowsService.openPortfolio(member)
  }
}
