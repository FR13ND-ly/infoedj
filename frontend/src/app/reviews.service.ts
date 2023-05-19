import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  readonly apiURL = 'https://cyos.onrender.com/reviews/';

  getReviews() {
    return this.http.get(`${this.apiURL}all`);
  }

  addReview(review : any) {
    return this.http.post(`${this.apiURL}add`, review);
  }

}
