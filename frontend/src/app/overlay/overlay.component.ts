import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map } from 'rxjs';
import { events } from '../events/events.data';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnInit {

  constructor(private store: Store<any>, private platform : Platform) { }

  windows$ = this.store.select("windows")
  minimizeds$ = this.store.select("minimizeds")
  
  notificationsSubject$ = new BehaviorSubject<any>([])

  notifications$ = this.notificationsSubject$.pipe(
    map((item : any) : any => {
      let exceptionsRaw = localStorage.getItem('exceptions')
      let exceptions : any = JSON.parse(exceptionsRaw ? exceptionsRaw : '[]')
      if (!Array.isArray(exceptions)) return item
      return item.filter((el : any) => {
        return !exceptions.includes(el.id)
      })
    })
  )


  onClose(exception : string, notificationRef : any, res : boolean = true) {
    let exceptionsRaw = localStorage.getItem('exceptions')
    let exceptions : any = JSON.parse(exceptionsRaw ? exceptionsRaw : '[]')
    if (!Array.isArray(exceptions)) exceptions = []
    localStorage.setItem('exceptions',
      JSON.stringify([...exceptions, exception])
    )
    notificationRef.remove()
    return res
  }


  ngOnInit(): void {
    if (this.platform.ANDROID || this.platform.IOS) return
    this.notificationsSubject$.next(
      [...events].filter((el : any) => el.actual)
    )
  }

}
