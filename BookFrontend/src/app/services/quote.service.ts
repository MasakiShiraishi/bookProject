import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'http://localhost:5117/api/Quotations';

  constructor(private http: HttpClient) { }

  getQuotes() : Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  createQuote(quote: Omit<Quote, 'id'>): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote);
  }

  deleteQuote(id: number): Observable<Quote> {
    return this.http.delete<Quote>(`${this.apiUrl}/${id}`);
  }

}
