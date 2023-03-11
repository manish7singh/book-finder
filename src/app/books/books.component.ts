import {Component, OnInit} from '@angular/core';
import {Book} from "../modal/Book";
import {BooksService} from "./books.service";
import {SortBooksPipe} from "./sort-books.pipe";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [SortBooksPipe]
})
export class BooksComponent implements OnInit {

  data: any;
  booksList: Book[] = [];
  sortType = '';
  editingIndex: any = null;
  editedBook!: any;

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.getBooksData();
  }

  /**
   * Get the books details
   */
  getBooksData() {
    this.booksService.getBooksData().subscribe((response: any) => {
      this.data = response.data;
      this.booksList = this.data.books;
      console.log(this.data);
    });
  }

  /**
   * Method to add book to the exiting list
   */
  addBook() {
    const newBook = {
      "imageUrl": "https://m.media-amazon.com/images/I/91I2ywLs1YL.jpg",
      "title": "New Book",
      "PublishDate": "2022",
      "purchaseLink": "https://www.amazon.com/BFG-Roald-Dahl/dp/0142410381/"
    };
    this.booksList.push(newBook);
  }

  /**
   * Method to delete book as per the selection made by user.
   */
  deleteBook(index: number) {
    this.booksList.splice(index, 1);
  }

  /**
   * Method to edit book as per the selection made by user.
   */
  editBook(index: number) {
    this.editingIndex = index;
    this.editedBook = {...this.booksList[index]};
  }

  /**
   * Method to cancel edit book step.
   */
  cancelEdit() {
    this.editingIndex = null;
    this.editedBook = null;
  }

  /**
   * Method to save the edited book as per the user inputs.
   */
  saveEdit() {
    this.booksList[this.editingIndex] = this.editedBook;
    this.editingIndex = null;
    this.editedBook = null;
  }

}
