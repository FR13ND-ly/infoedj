import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {

  constructor(private store : Store<any>, private userService : UserService) { }

  member$ = this.store.select('member')

  async ngOnInit() {
    console.info((await this.userService.getCodes())[10])
  }
}
