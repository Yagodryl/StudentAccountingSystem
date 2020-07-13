using Microsoft.EntityFrameworkCore;
using StudentAccountingSystem.Areas.Admin.ViewModels;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Repositories;
using StudentAccountingSystem.Services.Abstraction;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Services.Implemetation
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IStudentProfileRepository _studentProfileRepository;
        public AccountService(IAccountRepository accountRepository,
            IStudentProfileRepository studentProfileRepository)
        {
            _accountRepository = accountRepository;
            _studentProfileRepository = studentProfileRepository;
        }
        public Task Delete(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public Task<DbUser> Get(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DbUser>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<StudentViewModel>> GetByFilter(FilterViewModel filter)
        {
            var query = _studentProfileRepository.GetAll();

            if (!String.IsNullOrEmpty(filter.SearchFirstName))
                query = query.Where(s => s.FirstName.Contains(filter.SearchFirstName));

            if (!String.IsNullOrEmpty(filter.SearchLastName))
                query = query.Where(s => s.LastName.Contains(filter.SearchLastName));

            switch (filter.Field)
            {
                case "firstName":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.FirstName);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.FirstName);
                    }
                    break;
                case "lastName":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.LastName);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.LastName);
                    }
                    break;
                case "birthday":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.Birthday);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.Birthday);
                    }
                    break;
                case "registerDate":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.RegisterDate);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.RegisterDate);
                    }
                    break;
                case "email":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.User.Email);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.User.Email);
                    }
                    break;
            }
            var items = await query.Select(s => new StudentViewModel
            {
                Id = s.Id,
                Key = s.Id,
                Email = s.User.Email,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Birthday = s.Birthday.ToShortDateString(),
                RegisterDate = s.RegisterDate.ToShortDateString(),
                StudyDates = s.StudentCourses.Select(sc => sc.StartDate.ToShortDateString()).ToList()
            })
                .Skip((filter.Current - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();
            return items;
        }

        public Task Insert(DbUser item)
        {
            throw new NotImplementedException();
        }


        public Task Update(DbUser item, object id, byte[] rowVersion)
        {
            throw new NotImplementedException();
        }
    }
    public interface IAccountService: IDataService<DbUser>
    {
        public Task<IEnumerable<StudentViewModel>> GetByFilter(FilterViewModel filter);
    }
}
