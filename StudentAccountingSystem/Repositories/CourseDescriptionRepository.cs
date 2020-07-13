using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Repositories.Abstract;

namespace StudentAccountingSystem.Repositories
{
    public class CourseDescriptionRepository: SqlRepository<CourseDescription>, ICourseDescriptionRepository
    {
        public CourseDescriptionRepository(EFDBContext context)
            :base(context)
        {
        }

        public override async Task<CourseDescription> GetById(object id)=>
            await GetAll().SingleOrDefaultAsync(c => c.Id == (Guid)id);
    }

    public interface ICourseDescriptionRepository : IRepository<CourseDescription>
    {
    }
}
