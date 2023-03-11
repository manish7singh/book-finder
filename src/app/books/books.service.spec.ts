import {TestBed} from '@angular/core/testing';

import {BooksService} from './books.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve books data from endpoint', () => {
    const mockData = [
      { title: 'Book A', PublishDate: '2021' },
      { title: 'Book B', PublishDate: '2021' }
    ];

    service.getBooksData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://s3.amazonaws.com/api-fun/books.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
