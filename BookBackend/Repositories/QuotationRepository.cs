using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BookBackend.Models;



namespace BookBackend.Repositories
{
          public class QuotationRepository
          {
                    private readonly JsonFileRepository _jsonFileRepository;
                    private List<Quotation> _quotations;

                    public QuotationRepository(JsonFileRepository jsonFileRepository)
                    {
                              _jsonFileRepository = jsonFileRepository;
                              _quotations = Task.Run(() => _jsonFileRepository.LoadDataAsync()).Result.Quotations ?? new List<Quotation>();
                    }

                    public List<Quotation> GetAllQuotations()
                    {
                              return _quotations;
                    }
                    
                    public Quotation GetQuotation(int id)
                    {
                              return _quotations.FirstOrDefault(q => q.Id == id) ?? throw new InvalidOperationException("Quotation not found");
                    }

                    public async Task<Quotation> AddQuotationAsync(Quotation newQuotation)
                    {
                              newQuotation.Id = _quotations.Any() ? _quotations.Max(q => q.Id) + 1 : 1;
                              _quotations.Add(newQuotation);
                              await SaveChangesAsync();
                              return newQuotation;
                    }

                    public async Task<Quotation> UpdateQuotationAsync(int id, Quotation updatedQuotation)
                    {
                              var quotation = _quotations.FirstOrDefault(q => q.Id == id) ?? throw new InvalidOperationException("Quotation not found");
                              quotation.Text = updatedQuotation.Text;
                              quotation.Author = updatedQuotation.Author;
                              await SaveChangesAsync();
                              return quotation;
                    }

                    public async Task DeleteQuotationAsync(int id)
                    {
                              var quotation = _quotations.FirstOrDefault(q => q.Id == id) ?? throw new InvalidOperationException("Quotation not found");
                              _quotations.Remove(quotation);
                              await SaveChangesAsync();
                    }

                    private async Task SaveChangesAsync()
                    {
                              var data = new Data { Quotations = _quotations };
                              await _jsonFileRepository.SaveDataAsync(data);
                    }

          }
}