import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  newBook: Omit<Book, 'id'> = { title: '', author: '', publicationDate: '' };
  errorMessage: string | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  addBook(form: NgForm): void {
    if(form.invalid){
      this.errorMessage = 'Vänligen fyll i alla fält.';
      return;
    }
    this.bookService.createBook(this.newBook).subscribe(() => {
      this.newBook = { title: '', author: '', publicationDate: '' };
      this.router.navigate(['/book-list']);
    });
  }
  navigateToBookList(): void {
    this.router.navigate(['/']);
  }
}
