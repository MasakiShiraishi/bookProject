import { Component } from '@angular/core';
import { Quote } from '../../../models/quote';
import { QuoteService } from '../../../services/quote.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-view.component.html',
  styleUrl: './quote-view.component.css',
})
export class QuoteViewComponent {
  quotes: Quote[] = [];
  displayQuotes: Quote[] = [];

  constructor(private quoteSwervice: QuoteService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteSwervice.getQuotes().subscribe((quotes: Quote[]) => {
      this.quotes = quotes;
      this.displayQuotes = this.quotes.slice(0, 5);
      console.log(this.displayQuotes);
    });
  }

  navigateToQuoteList(): void {
    this.router.navigate(['/quote-view']).then(() => {
      this.loadQuotes();
    });
  }
  navigateToAddQuote(): void {
    this.router.navigate(['/add-quote']);
  }

  deleteQuote(id: number): void {
    this.quoteSwervice.deleteQuote(id).subscribe(() => {
      this.quotes = this.quotes.filter((quote) => quote.id !== id);
      this.displayQuotes = this.quotes.slice(0, 5);
    });
  }
}
