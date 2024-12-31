using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BookBackend.Models;
using BookBackend.Repositories;

namespace BookBackend.Controllers
{
          [Route("api/[controller]")]
          [ApiController]
          public class BooksController : ControllerBase
          {
                    private readonly BooksRepository _booksRepository;

                    public BooksController()
                    {
                              _booksRepository = new BooksRepository();
                    }

                    [HttpGet]
                    public ActionResult<List<Book>> GetBooks()
                    {
                              return _booksRepository.GetAllBooks();
                    }

                    [HttpPost]
                    public ActionResult<Book> AddBook(Book newBook)
                    {
                              var addedBook = _booksRepository.AddBook(newBook);
                              return addedBook;
                    }

                    [HttpGet("{id}")]
                    public ActionResult<Book> GetBook(int id)
                    {
                              var book = _booksRepository.GetBook(id);
                              if (book == null)
                              {
                                        return NotFound();
                              }
                              return book;
                    }
                    [HttpPut("{id}")]
                    public ActionResult<Book> PutBook(int id, Book updatedBook)
                    {
                              var existingBook = _booksRepository.GetBook(id);
                              if (existingBook == null)
                              {
                                        return NotFound();
                              }
                              var updatedBookResult = _booksRepository.UpdateBook(id, updatedBook);
                              return updatedBookResult;
                    }


          }
}