using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Services.Abstraction;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Services.Implemetation
{
    public class JWTTokenService : IJWTTokenService
    {

        private readonly EFDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<DbUser> _userManager;

        public JWTTokenService(EFDBContext context,
            IConfiguration configuration,
            UserManager<DbUser> userManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public string CreateToken(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            roles = roles.OrderByDescending(r => r).ToList();
            var claims = new List<Claim>();

            var result = _context.Users.Include(x=>x.StudentProfile).FirstOrDefault(u => u.Email == user.Email);
            if (result != null)
            {
                claims = new List<Claim>()
                {
                    new Claim("id", result.Id.ToString()),
                    new Claim("name", result.StudentProfile.FullName)
                };
                foreach (var role in roles)
                {
                    claims.Add(new Claim("roles", role));
                }
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is Jon friend of Bob"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                    signingCredentials: signingCredentials,
                    claims: claims,
                    expires: DateTime.Now.AddDays(10));
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
