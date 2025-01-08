import { Component } from '@angular/core';
import { Quote } from '../../../models/quote';
import { QuoteService } from '../../../services/quote.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
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
  errorMessage: string |null = null;

  constructor(private quoteService: QuoteService, private router: Router) {}

  addQuote(form: NgForm): void {
    if(form.invalid){
      this.errorMessage = 'Vänligen fyll i alla fält.';
      return;
    }
    this.quoteService.createQuote(this.newQuote).subscribe(() => {
      this.newQuote = { text: '', author: '' };
      this.router.navigate(['/quote-view']);
    });
  }

  navigateToQuoteList(): void {
    this.router.navigate(['/quote-view']);
  }
}
