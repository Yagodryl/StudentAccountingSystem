using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Repositories.Abstract
{
    public interface IRepository<T>
    {
        Task Insert(T item);
        IQueryable<T> GetAll();
        Task<T> GetById(object id);
        Task Update(T item, object id, byte[] rowVersion);
        void Delete(T item);

        Task AddRange(IEnumerable<T> entities);
        void RemoveRange(params object[] filters);

        void Save();
    }
}
