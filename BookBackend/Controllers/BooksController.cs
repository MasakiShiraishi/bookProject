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

                    public BooksController(BooksRepository booksRepository)
                    {
                              _booksRepository = booksRepository;
                    }                 

                    [HttpGet]
                    public ActionResult<IEnumerable<Book>> GetBooks()
                    {
                              return _booksRepository.GetAllBooks();
                    }

                    [HttpPost]
                    public async Task<ActionResult<Book>> AddBook(Book newBook)
                    {
                              var addedBook = await _booksRepository.AddBookAsync(newBook);
                              return CreatedAtAction(nameof(GetBook), new { id = addedBook.Id }, addedBook);
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
                    public async Task<ActionResult<Book>> PutBook(int id, Book updatedBook)
                    {
                              var existingBook = await _booksRepository.UpdateBookAsync(id, updatedBook);
                              if (existingBook == null)
                              {
                                        return NotFound();
                              }                              
                              return existingBook;
                    }
                    [HttpDelete("{id}")]
                    public async Task<ActionResult> DeleteBook(int id)
                    {
                              await _booksRepository.DeleteBookAsync(id);
                              return NoContent();
                    }


          }
}