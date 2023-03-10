import {Component, OnInit} from '@angular/core';
import {Book} from "../modal/Book";
import {BooksService} from "./books.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  data: any;
  booksList: Book[] = [];
  sortType: string = '';
  editingIndex: any = null;
  editedBook!: any;

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.getBooksData();
  }

  getBooksData() {
    this.booksService.getBooksData().subscribe((response: any) => {
      this.data = response.data;
      this.booksList = this.data.books;
      console.log(this.data);
    });
  }

  addBook() {
    const newBook = {
      "imageUrl": "https://m.media-amazon.com/images/I/91I2ywLs1YL.jpg",
      "title": "New Book",
      "PublishDate": "2022",
      "purchaseLink": "https://www.amazon.com/BFG-Roald-Dahl/dp/0142410381/"
    };
    this.data.books.push(newBook);
  }

  deleteBook(index: number) {
    this.data.books.splice(index, 1);
  }

  editBook(index: number) {
    this.editingIndex = index;
    this.editedBook = {...this.data.books[index]};
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editedBook = null;
  }

  saveEdit() {
    this.data.books[this.editingIndex] = this.editedBook;
    this.editingIndex = null;
    this.editedBook = null;
  }

}
