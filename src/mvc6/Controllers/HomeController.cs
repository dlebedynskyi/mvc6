using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.OptionsModel;
using mvc6.Options;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace mvc6.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
     
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewBag.Title = "Site Has Title";
            return View();
        }
    }
}
