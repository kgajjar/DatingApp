﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string message = null, string details = null)//Initialise to null so that e dont always need to provide the properties
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public string Details { get; set; }
    }
}
