using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using BookBackend.Models;

namespace BookBackend.Repositories
{
          public class BooksRepository
          {
                    private readonly string _dataFilePath = "data.json";
                    private List<Book> _books;
                    public BooksRepository()
                    {
                              var json = File.ReadAllText(_dataFilePath);
                              _books = JsonConvert.DeserializeObject<Data>(json)?.Books ?? new List<Book>(); 
                    }

                    public List<Book> GetAllBooks()
                    {
                              return _books;
                    }

                    public Book AddBook(Book newBook)
                    {
                              newBook.Id = _books.Any() ? _books.Max(b => b.Id) + 1 : 1;
                              _books.Add(newBook);
                              SaveChanges();
                              return newBook;
                    }

                    private void SaveChanges()
                    {
                              var data = new Data { Books = _books }; 
                              var json = JsonConvert.SerializeObject(data, Formatting.Indented); 
                              File.WriteAllText(_dataFilePath, json);

                    }
          }
          
}