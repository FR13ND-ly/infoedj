import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowsService } from '../windows.service';
import { events } from './events.data';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {

  constructor(private windowsService : WindowsService) { }

  events = [...events]

  onOpen(event : any) {
    this.windowsService.openEvent(event)
  }

  onOpenMob(event : any) {
    if (this.windowsService.isMobile()) this.windowsService.openEvent(event)
  }

}
