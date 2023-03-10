import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private endpointUrl = 'https://s3.amazonaws.com/api-fun/books.json';

  constructor(private http: HttpClient) {
  }

  /**
   * Method to retrieve books data from the endpointURL.
   */
  getBooksData(): Observable<any> {
    return this.http.get(this.endpointUrl);
  }
}
