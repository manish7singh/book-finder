import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksComponent} from './books.component';
import {of} from "rxjs";
import {BooksService} from "./books.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Book} from "../modal/Book";
import {SortBooksPipe} from "./sort-books.pipe";


describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let booksService: BooksService;
  let mockBooks: Book[] = [
    {
      "imageUrl": "https://m.media-amazon.com/images/I/91I2ywLs1YL.jpg",
      "title": "The BFG",
      "purchaseLink": "https://www.amazon.com/BFG-Roald-Dahl/dp/0142410381/",
      "PublishDate": "1982"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/91C5S-RQeeL.jpg",
      "title": "The Witches",
      "purchaseLink": "https://www.amazon.com/Witches-Roald-Dahl/dp/014241011X/",
      "PublishDate": "1983"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/81Fe-GJQDuL.jpg",
      "title": "Charlie and the Chocolate Factory",
      "purchaseLink": "https://www.amazon.com/Charlie-Chocolate-Factory-Roald-Dahl/dp/0142410314/",
      "PublishDate": "1964"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/91cYX8Th0VL.jpg",
      "title": "James and the Giant Peach",
      "purchaseLink": "https://www.amazon.com/James-Giant-Peach-Roald-Dahl/dp/0142410365/",
      "PublishDate": "1961"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/81LWiusthFL.jpg",
      "title": "Matilda",
      "purchaseLink": "https://www.amazon.com/Matilda-Roald-Dahl/dp/0142410373/",
      "PublishDate": "1988"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/91VFZJOzyEL.jpg",
      "title": "The Enormous Crocodile",
      "purchaseLink": "https://www.amazon.com/Enormous-Crocodile-Roald-Dahl/dp/0140365567/",
      "PublishDate": "1978"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/81n7O4GGjeL.jpg",
      "title": "George's Marvelous Medicine",
      "purchaseLink": "https://www.amazon.com/Georges-Marvelous-Medicine-Roald-Dahl/dp/0142410357/",
      "PublishDate": "1981"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/81pbYE-DPIL.jpg",
      "title": "The Wonderful Story of Henry Sugar",
      "purchaseLink": "https://www.amazon.com/Wonderful-Story-Henry-Sugar/dp/0141304707/",
      "PublishDate": "1977"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/91oa7T-wJ+L.jpg",
      "title": "Danny the Champion of the World",
      "purchaseLink": "https://www.amazon.com/Danny-Champion-World-Roald-Dahl/dp/0142410330/",
      "PublishDate": "1975"
    },
    {
      "imageUrl": "https://m.media-amazon.com/images/I/91TPctYVPZL.jpg",
      "title": "Charlie and the Great Glass Elevator",
      "purchaseLink": "https://www.amazon.com/Charlie-Great-Glass-Elevator-Roald/dp/0142410322/",
      "PublishDate": "1972"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BooksComponent, SortBooksPipe],
      providers: [BooksService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books data on initialization', () => {
    spyOn(booksService, 'getBooksData').and.returnValue(of({data: {books: mockBooks}}));
    component.ngOnInit();
    expect(component.booksList).toEqual(mockBooks);
  });

  it('should add a new book', () => {
    component.booksList = mockBooks;
    const initialLength = component.booksList.length;
    component.addBook();
    expect(component.booksList.length).toEqual(initialLength + 1);
    expect(component.booksList[initialLength].title).toEqual('New Book');
  });

  it('should delete a book', () => {
    component.booksList = mockBooks;
    const indexToDelete = 0;
    const initialLength = component.booksList.length;
    component.deleteBook(indexToDelete);
    expect(component.booksList.length).toEqual(initialLength - 1);
    expect(component.booksList[indexToDelete].title).toEqual('The Witches');
  });

  it('should edit a book', () => {
    component.booksList = mockBooks;
    const indexToEdit = 0;
    component.editBook(indexToEdit);
    expect(component.editingIndex).toEqual(indexToEdit);
    expect(component.editedBook).toEqual(mockBooks[indexToEdit]);
  });

  it('should cancel book edit', () => {
    component.editingIndex = 0;
    component.editedBook = mockBooks[0];
    component.cancelEdit();
    expect(component.editingIndex).toBeNull();
    expect(component.editedBook).toBeNull();
  });

  it('should save book edit', () => {
    component.booksList = mockBooks;
    component.editingIndex = 0;
    component.editedBook = null;
    component.saveEdit();
    expect(component.booksList[0]).toEqual(component.editedBook);
    expect(component.editingIndex).toBeNull();
    expect(component.editedBook).toBeNull();
  });
});
