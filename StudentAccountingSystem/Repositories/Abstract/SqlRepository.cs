using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Repositories.Abstract
{
    public abstract class SqlRepository<T> : IRepository<T>
        where T : class
    {
        protected readonly DbContext Context;
        protected readonly DbSet<T> EfDbSet;

        protected SqlRepository(DbContext context)
        {
            Context = context;
            EfDbSet = context.Set<T>();
        }

        #region IRepository<T> Members

        public virtual async Task Insert(T item)
            => await EfDbSet.AddAsync(item);

        public virtual IQueryable<T> GetAll()
            => EfDbSet;

        public abstract Task<T> GetById(object id);

        public virtual async Task Update(T item, object id, byte[] rowVersion)
        {
            var entry = Context.Entry(item);
            if (entry.State == EntityState.Detached)
            {
                var attachedItem = await GetById(id);
                if (attachedItem != null)
                {
                    //Context.Entry(attachedItem).Property("RowVersion").OriginalValue = rowVersion;
                    Context.Entry(attachedItem).CurrentValues.SetValues(item);
                }
                else
                {
                    entry.State = EntityState.Modified;
                }
            }
        }

        public virtual void Delete(T item) => EfDbSet.Remove(item);

        public virtual async Task AddRange(IEnumerable<T> entities)
            => await Context.AddRangeAsync(entities);

        public virtual void RemoveRange(params object[] filters)
            => throw new NotImplementedException();

        public virtual void Save()
            => Context.SaveChanges();

        #endregion
    }
}
