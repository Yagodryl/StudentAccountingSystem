using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Validators.Responces
{
    public class ErrorResponce
    {
        public List<ErrorModel> Errors { get; set; } = new List<ErrorModel>();
    }
}
