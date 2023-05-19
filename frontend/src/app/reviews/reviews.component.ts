import { Component } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  constructor(private reviewsService: ReviewsService) { }

  reviews$ : Observable<any> = this.reviewsService.getReviews();

  onAddReview(form: NgForm, reviews : any) {
    if (form.invalid) return;
    reviews.push(form.value);
    this.reviewsService.addReview(form.value).subscribe()
    form.reset();
  }

}
