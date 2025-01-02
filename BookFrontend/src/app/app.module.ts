import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookListComponent } from './component/book-list/book-list.component';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { EditBookComponent } from './component/edit-book/edit-book.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    BookListComponent,
    FormsModule,
    EditBookComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
