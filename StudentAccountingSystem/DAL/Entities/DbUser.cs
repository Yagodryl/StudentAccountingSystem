using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.DAL.Entities
{
    public class DbUser : IdentityUser<Guid>
    {
        public long? FacebookId { get; set; }
        public ICollection<DbUserRole> UserRoles { get; set; }
        public virtual StudentProfile StudentProfile { get; set; }
    }
}
