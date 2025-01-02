using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using BookBackend.Models;

public class JsonFileRepository
{
    private readonly string _filePath;

    public JsonFileRepository(string filePath)
    {
        _filePath = Path.Combine(Directory.GetCurrentDirectory(), filePath);
    }

    public async Task<Data> LoadDataAsync()
    {
        if (!File.Exists(_filePath))
        {
            return new Data();
        }

        var json = await File.ReadAllTextAsync(_filePath);
        return JsonSerializer.Deserialize<Data>(json) ?? new Data();
    }

    public async Task SaveDataAsync(Data newData)
    {
        var existingData = await LoadDataAsync();

        if (existingData.Users != null)
        {
            newData.Users ??= new List<User>();
            foreach (var user in existingData.Users)
            {
                if (!newData.Users.Any(u => u.Username == user.Username && u.Password == user.Password))
                {
                    newData.Users.Add(user);
                }
            }
        }

        if (existingData.Books != null)
        {
            newData.Books ??= new List<Book>();
            foreach (var book in existingData.Books)
            {
                if (!newData.Books.Any(b => b.Id == book.Id))
                {
                    newData.Books.Add(book);
                }
            }
        }


        var json = JsonSerializer.Serialize(newData, new JsonSerializerOptions { WriteIndented = true });
        await File.WriteAllTextAsync(_filePath, json);
    }
}
