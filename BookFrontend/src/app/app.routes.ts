
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path:'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}