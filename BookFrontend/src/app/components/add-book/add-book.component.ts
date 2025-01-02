import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  newBook: Omit<Book, 'id'> = { title: '', author: '', publicationDate: '' };

  constructor(private bookService: BookService, private router: Router) {}

  addBook(): void {
    this.bookService.createBook(this.newBook).subscribe(() => {
      this.newBook = { title: '', author: '', publicationDate: '' };
      this.router.navigate(['/']);
    });
  }
  navigateToBookList(): void {
    this.router.navigate(['/']);
  }
}
