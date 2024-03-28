﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Vue.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Diagnostics;

namespace it_template.Areas.V1.Controllers
{
	[Area("V1")]
	[Authorize(Roles = "Administrator,User,Manager Task")]
	//[Authorize]
	public class BaseController : Controller
	{
		protected readonly ItContext _context;

		public BaseController(ItContext context)
		{
			_context = context;
			var listener = _context.GetService<DiagnosticSource>();
			(listener as DiagnosticListener).SubscribeWithAdapter(new CommandInterceptor());
		}
	}
}
