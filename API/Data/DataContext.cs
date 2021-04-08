using API.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class DataContext : DbContext
    {
        //We will pass this ctor options from Startup.cs files later
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        //Creates table called Users in DB
        public DbSet<AppUser> Users { get; set; }


    }
} 
