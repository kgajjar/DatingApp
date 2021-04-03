using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]//MaxLength:8, MinLength: 4. {JUST FOR ERROR HANDLING TEST TO SEE ADDITIONAL RESPONSES.}
        public string Password { get; set; }
    }
}
