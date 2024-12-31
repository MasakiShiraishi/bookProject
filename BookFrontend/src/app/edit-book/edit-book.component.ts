import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';

import { Book } from '../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  editingBook: Partial<Book> = {};
  constructor(private bookService: BookService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookService.getBook(id).subscribe((book) => {
        this.editingBook = book || null;
      });
    }
  }
  updateBook(): void {
    if (this.editingBook) {
      this.bookService
        .updateBook(this.editingBook as Book)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
  navigateToBookList(): void { this.router.navigate(['/']); }
}
