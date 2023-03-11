import {SortBooksPipe} from './sort-books.pipe';
import {Book} from "../modal/Book";

describe('SortBooksPipe', () => {
  let pipe: SortBooksPipe;

  beforeEach(() => {
    pipe = new SortBooksPipe();
  });

  it('create an instance', () => {
    const pipe = new SortBooksPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort books by title', () => {
    const books: Book[] = [
      { title: 'B', PublishDate: '2022' },
      { title: 'A', PublishDate: '2021' },
    ];
    const sortedBooks: Book[] = pipe.transform(books, 'title');
    expect(sortedBooks).toEqual([
      { title: 'A', PublishDate: '2021' },
      { title: 'B', PublishDate: '2022' },
    ]);
  });

  it('should sort books by date', () => {
    const books: Book[] = [
      { title: 'B', PublishDate: '2022' },
      { title: 'A', PublishDate: '2021' },
    ];
    const sortedBooks: Book[] = pipe.transform(books, 'date');
    expect(sortedBooks).toEqual([
      { title: 'A', PublishDate: '2021' },
      { title: 'B', PublishDate: '2022' },
    ]);
  });
});
