import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { gallery } from '../gallery/gallery.data';
import { setImage } from '../state/image/image.actions';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {

  constructor(private store : Store<any>) { }
  
  ngOnInit(): void {
    document.onkeydown = (e) => {
      if (e.key == "ArrowLeft") {
        this.imageIndex$.pipe(first()).subscribe((i) => this.previous(i))
      }
      if (e.key == "ArrowRight") {
        this.imageIndex$.pipe(first()).subscribe((i) => this.next(i)) 
      }
    };
  }

  images = [...gallery]

  imageIndex$ = this.store.select('image')

  next(i : number) {
    this.store.dispatch(setImage({
      image : (i + 1) % this.images.length
    }))
    
  }

  previous(i : number) {
    this.store.dispatch(setImage({
      image : !i ? this.images.length - 1 : i - 1 
    }))
  }
}
