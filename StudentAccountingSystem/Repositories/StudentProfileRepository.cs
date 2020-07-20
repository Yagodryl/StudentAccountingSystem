using Microsoft.EntityFrameworkCore;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Repositories
{
    public class StudentProfileRepository : SqlRepository<StudentProfile>, IStudentProfileRepository
    {
        public StudentProfileRepository(EFDBContext context)
            :base(context)
        {
        }
        public override async Task<StudentProfile> GetById(object id) =>
            await GetAll().SingleOrDefaultAsync(c => c.Id == (Guid)id);
    }
    public interface IStudentProfileRepository: IRepository<StudentProfile>
    {
    }
}
