import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { AppRoutingModule } from './app.routes';
// import { LoggingInterceptor } from './logging.intercepter';

@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    BookListComponent
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule {}