using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentAccountingSystem.DAL.Entities;
namespace StudentAccountingSystem.DAL
{
    public class EFDBContext : IdentityDbContext<DbUser, DbRole, long, IdentityUserClaim<long>,
    DbUserRole, IdentityUserLogin<long>,
    IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public EFDBContext(DbContextOptions<EFDBContext> options)
            : base(options)
        {

        }
        public virtual DbSet<StudentProfile> StudentProfiles { get; set; }
        public virtual DbSet<CourseStudent> CourseStudents { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<CourseDescription> CourseDescriptions { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DbUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<CourseStudent>(courseStudent =>
            {
                courseStudent.HasKey(cs => new { cs.CourseId, cs.StudentProfileId });

                courseStudent.HasOne(cs => cs.Course)
                    .WithMany(c => c.CourseStudents)
                    .HasForeignKey(cs => cs.CourseId);

                courseStudent.HasOne(cs => cs.StudentProfile)
                   .WithMany(s => s.CourseStudents)
                   .HasForeignKey(cs => cs.StudentProfileId);
            });

            builder.Entity<Course>()
                .HasOne(cd => cd.CourseDescription)
                .WithOne(c => c.Course)
                .HasForeignKey<CourseDescription>(cd => cd.CourseId);

        }
    }
}
