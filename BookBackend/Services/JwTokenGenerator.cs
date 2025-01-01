using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class JwtTokenGenerator
{
    public string GenerateToken(string username)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY")?.Trim();
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER")?.Trim();
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE")?.Trim();

        if (string.IsNullOrEmpty(jwtKey) || jwtKey.Length < 16)
        {
            throw new InvalidOperationException("JWT_KEY must be at least 16 characters long.");
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            jwtIssuer,
            jwtAudience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
