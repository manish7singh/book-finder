import {Pipe, PipeTransform} from '@angular/core';
import {Book} from "../modal/Book";

@Pipe({
  name: 'sortBooks'
})
export class SortBooksPipe implements PipeTransform {

  transform(books: Book[], sortType: string): any[] {
    if (sortType === 'title') {
      books = books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'date') {
      books = books.sort((a, b) => new Date(a.PublishDate).getTime() - new Date(b.PublishDate).getTime());
    }
    return books;
  }

}
