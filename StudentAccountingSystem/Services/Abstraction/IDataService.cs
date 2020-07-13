using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Services.Abstraction
{
    public interface IDataService<T> where T: class
    {
        Task Insert(T item);
        Task<T> Get(params object[] keys);
        Task<IEnumerable<T>> GetAll();
        Task Update(T item, object id, byte[] rowVersion);
        Task Delete(params object[] keys);
    }
}
