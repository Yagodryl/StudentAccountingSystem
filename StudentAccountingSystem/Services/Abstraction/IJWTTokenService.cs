using StudentAccountingSystem.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Services.Abstraction
{
    public interface IJWTTokenService
    {
        string CreateToken(DbUser user);
    }
}
