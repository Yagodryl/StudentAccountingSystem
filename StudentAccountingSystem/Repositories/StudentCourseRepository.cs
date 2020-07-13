using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Repositories
{
    public class StudentCourseRepository: SqlRepository<StudentCourse>, IStudentCourseRepository
    {
        public StudentCourseRepository(EFDBContext context):base(context)
        {
        }

        public override Task<StudentCourse> GetById(object id)
        {
            throw new NotImplementedException();
        }
    }
    public interface IStudentCourseRepository:IRepository<StudentCourse>
    {
    }
}
