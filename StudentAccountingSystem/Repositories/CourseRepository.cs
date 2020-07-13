using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Repositories.Abstract;

namespace StudentAccountingSystem.Repositories
{
    public class CourseRepository : SqlRepository<Course>, ICourseRepository
    {
        public CourseRepository(EFDBContext context)
            :base(context)
        {
        }
        public override async Task<Course> GetById(object id) =>
            await GetAll().SingleOrDefaultAsync(c => c.Id == (Guid)id);
    }

    public interface ICourseRepository:IRepository<Course>
    {
    }
}
