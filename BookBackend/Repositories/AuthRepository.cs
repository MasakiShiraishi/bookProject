using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using BookBackend.Models;

public class AuthRepository
{

    private readonly JsonFileRepository _jsonFileRepository;
    private List<User> _users;

    public AuthRepository(JsonFileRepository jsonFileRepository)
    {
        _jsonFileRepository = jsonFileRepository;
        var data = Task.Run(() => _jsonFileRepository.LoadDataAsync()).Result;
        _users = data.Users ?? new List<User>();
    }

    public User GetUser(string username, string password)
    {
        return _users.FirstOrDefault(u => u.Username == username && u.Password == password);
    }

    public List<User> GetAllUsers()
    {
        return _users;
    }
}

