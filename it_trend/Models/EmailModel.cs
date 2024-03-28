﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace Vue.Models
{
	[Table("emails")]
	public class EmailModel
	{
		[Key]
		public int id { get; set; }

		public int status { get; set; }
		public string subject { get; set; }
		public string email_to { get; set; }
		public string email_type { get; set; }
		public string body { get; set; }

		public DateTime? date { get; set; }

		public string? error { get; set; }
	}
}
