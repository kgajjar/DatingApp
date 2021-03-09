using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class AppUser
    {
        public int Id { get; set; }

        //Name accordingly as we will use Identity later on
        public string UserName { get; set; }
    }
}
