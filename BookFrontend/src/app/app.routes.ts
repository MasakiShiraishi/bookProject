
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { QuoteViewComponent } from './components/(quotes)/quote-view/quote-view.component';
import { AddQuoteComponent } from './components/(quotes)/add-quote/add-quote.component';

export const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'book-list', component: BookListComponent, canActivate: [AuthGuard] },
  { path:'add-book', component: AddBookComponent,canActivate: [AuthGuard] },
  { path: 'edit-book/:id', component: EditBookComponent,canActivate: [AuthGuard] },
  { path: 'quote-view', component: QuoteViewComponent,canActivate: [AuthGuard] },
  { path: 'add-quote', component: AddQuoteComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}