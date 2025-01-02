using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using BookBackend.Models;

namespace BookBackend.Repositories
{
          public class BooksRepository
          {
                    private readonly JsonFileRepository _jsonFileRepository;
                    private List<Book> _books;
                    public BooksRepository(JsonFileRepository jsonFileRepository)
                    {
                              _jsonFileRepository = jsonFileRepository;
                              _books = Task.Run(() => _jsonFileRepository.LoadDataAsync()).Result.Books ?? new List<Book>();
                    }
                                                                                
                    public List<Book> GetAllBooks()
                    {
                              return _books;
                    }

                    public Book GetBook(int id)
                    {
                              return _books.FirstOrDefault(b => b.Id == id) ?? throw new InvalidOperationException("Book not found");
                    }                    

                    public async Task<Book> AddBookAsync(Book newBook)
                    {
                              newBook.Id = _books.Any() ? _books.Max(b => b.Id) + 1 : 1;
                              _books.Add(newBook);
                              await SaveChangesAsync();
                              return newBook;
                    }

                    public async Task<Book> UpdateBookAsync(int id, Book updatedBook)
                    {
                              var book = _books.FirstOrDefault(b => b.Id == id) ?? throw new InvalidOperationException("Book not found");
                              book.Title = updatedBook.Title;
                              book.Author = updatedBook.Author;
                              book.PublicationDate = updatedBook.PublicationDate;
                               await SaveChangesAsync();
                              return book;
                    }

                    public async Task DeleteBookAsync(int id)
                    {
                              var book = _books.FirstOrDefault(b => b.Id == id) ?? throw new InvalidOperationException("Book not found");
                              _books.Remove(book);
                              await SaveChangesAsync();
                    }

                    private async Task SaveChangesAsync()
                    {
                              var data = new Data { Books = _books };
                              await _jsonFileRepository.SaveDataAsync(data);

                    }
          }

}