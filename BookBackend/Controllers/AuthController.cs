using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using BookBackend.Repositories;
using BookBackend.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository _authRepository;

    public AuthController(IAuthRepository authRepository)
    {
        _authRepository = authRepository;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest("User data is required.");
        }

        try
        {
            var existingUser = _authRepository.GetUser(user.Username, user.Password);
            if (existingUser != null)
            {
                return Ok("Login successful");
            }
            return Unauthorized("Invalid username or password");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }
}
