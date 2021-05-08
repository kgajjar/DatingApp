using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        //public static void Main(string[] args) THIS IS OLD VERSION
        //Make this async
        public static async Task Main(string[] args)//All below happens before application starts running. Here we are outside our middleware
        {
            //Assigning CreateHostBuilder(args).Build().Run() to variable called host. Removed .Run function for this. We add it last.
            var host = CreateHostBuilder(args).Build();

            //Get our DataContext service so we can pass it to our Seed method
            using var scope = host.Services.CreateScope();//We create a scope for the services we want to bring in

            var services = scope.ServiceProvider;

            //Since we are outside our Middleware we dont have the Exception handling feature. 
            //Add try catch for any exceptions that might occur during seeding data

            try
            {
                var context = services.GetRequiredService<DataContext>();

                //If we drop our DB. We just need to restart our app ofr it to be recreated.
                await context.Database.MigrateAsync();

                //Run SEED method to seed users to DB
                await Seed.SeedUsers(context);
            }
            catch (Exception ex)
            {
                //Get access to our logger by fetching logger service
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during migration");
            }

            //Now we Run
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
