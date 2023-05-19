import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent {

  constructor(private store : Store<any>, private userService : UserService) { }

  event$ = this.store.select('event')

  async onAction(url : any) {
    window.open(url);
    console.warn((await this.userService.getCodes())[9])
  }
}
