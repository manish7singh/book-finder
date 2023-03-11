import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {BooksComponent} from "./books/books.component";
import {HttpClientModule} from "@angular/common/http";
import {SortBooksPipe} from "./books/sort-books.pipe";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        BooksComponent,
        SortBooksPipe
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the BooksComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-books')).not.toBeNull();
  });
});
