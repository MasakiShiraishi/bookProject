using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using BookBackend.Repositories;
using BookBackend.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthRepository _authRepository;
    private readonly JwtTokenGenerator _tokenGenerator;

    public AuthController(AuthRepository authRepository, JwtTokenGenerator tokenGenerator)
    {
        _authRepository = authRepository;
        _tokenGenerator = tokenGenerator;
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
                var token = _tokenGenerator.GenerateToken(user.Username);
                return Ok(new { Token = token });
            }
            return Unauthorized("Invalid username or password");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("users")]
    public ActionResult<List<User>> GetAllUsers()
    {
        return _authRepository.GetAllUsers();
    }
}
