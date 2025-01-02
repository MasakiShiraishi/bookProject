using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BookBackend.Models;
using BookBackend.Repositories;




namespace BookBackend.Controllers

{
          [Route("api/[controller]")]
          [ApiController]
          public class QuotationsController : ControllerBase
          {
                    private readonly QuotationRepository _quotationRepository;

                    public QuotationsController(QuotationRepository quotationRepository)
                    {
                              _quotationRepository = quotationRepository;
                    }

                    [HttpGet]
                    public ActionResult<IEnumerable<Quotation>> GetQuotations()
                    {
                              return _quotationRepository.GetAllQuotations();
                    }

                    [HttpPost]
                    public async Task<ActionResult<Quotation>> AddQuotation(Quotation newQuotation)
                    {
                              var addedQuotation = await _quotationRepository.AddQuotationAsync(newQuotation);
                              return CreatedAtAction(nameof(GetQuotation), new { id = addedQuotation.Id }, addedQuotation);
                    }

                    [HttpGet("{id}")]
                    public ActionResult<Quotation> GetQuotation(int id)
                    {
                              var quotation = _quotationRepository.GetQuotation(id);
                              if (quotation == null)
                              {
                                        return NotFound();
                              }
                              return quotation;
                    }
                    [HttpPut("{id}")]
                    public async Task<ActionResult<Quotation>> PutQuotation(int id, Quotation updatedQuotation)
                    {
                              var existingQuotation = await _quotationRepository.UpdateQuotationAsync(id, updatedQuotation);
                              if (existingQuotation == null)
                              {
                                        return NotFound();
                              }
                              return existingQuotation;
                    }
                    [HttpDelete("{id}")]
                    public async Task<ActionResult> DeleteQuotation(int id)
                    {
                              await _quotationRepository.DeleteQuotationAsync(id);
                              return NoContent();
                    }
          }
}