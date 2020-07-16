using FluentValidation.AspNetCore;
using Hangfire;
using Hangfire.SQLite;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Helpers;
using StudentAccountingSystem.Repositories;
using StudentAccountingSystem.Services.Abstraction;
using StudentAccountingSystem.Services.Implemetation;
using System;
using System.Text;

namespace StudentAccountingSystem
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddMvc(options => 
            {
                options.EnableEndpointRouting = false;
                options.Filters.Add<ValidationFilter>();
            })
                .AddFluentValidation(mvcConfiguration=> mvcConfiguration.RegisterValidatorsFromAssemblyContaining<Startup>());
            var options = new DbContextOptionsBuilder();
            services.AddDbContext<EFDBContext>
                (options => options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllersWithViews();

            services.AddIdentity<DbUser, DbRole>(options => options.Stores.MaxLengthForKeys = 128)
                .AddEntityFrameworkStores<EFDBContext>()
                .AddDefaultTokenProviders();

            services.AddSession();

            #region HangFire
            var sqliteOptions = new SQLiteStorageOptions();

            services.AddHangfire(config =>
                config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseDefaultTypeSerializer()
                .UseSQLiteStorage(Configuration.GetConnectionString("HangFireStorage"), sqliteOptions));

            services.AddHangfireServer();
            #endregion

            #region Repositories
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IStudentCourseRepository, StudentCourseRepository>();
            services.AddScoped<IStudentProfileRepository, StudentProfileRepository>();
            services.AddScoped<ICourseDescriptionRepository, CourseDescriptionRepository>();
            #endregion

            #region Services
            services.AddScoped<IJWTTokenService, JWTTokenService>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IAccountService, AccountService>();
            #endregion

            #region Authentication
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is Jon friend of Bob"));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    // set ClockSkew is zero
                    ClockSkew = TimeSpan.Zero
                };
            });
            #endregion

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IWebHostEnvironment env,
            EFDBContext eFDBContext,
            IBackgroundJobClient backgroundJobClient,
            IRecurringJobManager recurringJobManager
            )
        {
            app.UseCors(
               builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            eFDBContext.Database.EnsureCreated();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseSession();

            #region HangFire
            //app.UseHangfireDashboard();

            //backgroundJobClient.Enqueue(() => Console.WriteLine("SSSS"));
           
            //recurringJobManager.AddOrUpdate("Message daily",
            //    () => Console.WriteLine("Test minte"),
            //    Cron.Daily(8), TimeZoneInfo.Local);
           
            //recurringJobManager.AddOrUpdate("Message monthly",
            //    () => Console.WriteLine("Test minte"),
            //     Cron.Daily(12), TimeZoneInfo.Local);
           
            //recurringJobManager.AddOrUpdate("Message weekly",
            //    () => Console.WriteLine("Test minte"),
            //    Cron.Daily(12), TimeZoneInfo.Local);
            #endregion

            #region InitStaticFiles SudentImages
            string pathStudent = InitStaticFiles
                .CreateFolderServer(env, this.Configuration,
                    new string[] { "ImagesPath", "ImagesPathStudent" });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(pathStudent),
                RequestPath = new PathString("/" + Configuration.GetValue<string>("StudentUrlImages"))
            });

            #endregion

            #region InitStaticFiles Images
            string pathRoot = InitStaticFiles
                .CreateFolderServer(env, this.Configuration,
                    new string[] { "ImagesPath" });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(pathRoot),
                RequestPath = new PathString("/" + Configuration.GetValue<string>("UrlImages"))
            });
            #endregion;

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            
            

            //SeederDB.SeedData(app.ApplicationServices, env, this.Configuration);
        }
    }
}
