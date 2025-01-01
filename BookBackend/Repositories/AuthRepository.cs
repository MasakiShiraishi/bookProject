using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using BookBackend.Models;

public interface IAuthRepository
{
    User GetUser(string username, string password);
}

public class AuthRepository : IAuthRepository
{
    private List<User> _users;

    public AuthRepository()
    {
        try
        {
            LoadUsersFromJson();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while loading users: {ex.Message}");
            _users = new List<User>();
        }
    }

    private void LoadUsersFromJson()
    {
        var filePath = Path.Combine(AppContext.BaseDirectory, "data.json");
        var json = File.ReadAllText(filePath);
        var jsonObject = JsonConvert.DeserializeObject<dynamic>(json);
        _users = JsonConvert.DeserializeObject<List<User>>(jsonObject.Users.ToString());
    }

    public User GetUser(string username, string password)
    {
        try
        {
            var user = _users.FirstOrDefault(u => u.Username == username && u.Password == password);
            return user; 
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while retrieving user: {ex.Message}");
            return null;
        }
    }
}
