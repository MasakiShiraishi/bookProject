import { Component } from '@angular/core';
import { Quote } from '../../../models/quote';
import { QuoteService } from '../../../services/quote.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-quote',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-quote.component.html',
  styleUrl: './add-quote.component.css',
})
export class AddQuoteComponent {
  newQuote: Omit<Quote, 'id'> = { text: '', author: '' };

  constructor(private quoteService: QuoteService, private router: Router) {}

  addQuote(): void {
    this.quoteService.createQuote(this.newQuote).subscribe(() => {
      this.newQuote = { text: '', author: '' };
      this.router.navigate(['/quote-view']);
    });
  }

  navigateToQuoteList(): void {
    this.router.navigate(['/quote-view']);
  }
}
