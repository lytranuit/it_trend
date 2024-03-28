using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vue.Models
{
    [Table("result")]
    public class ResultModel
    {
        public int id { get; set; }
        public int? location_id { get; set; }
        public decimal? value { get; set; }
        public string? value_text { get; set; }
        public string? note { get; set; }
        public DateTime? date { get; set; }
        public int? target_id { get; set; }
        public int? object_id { get; set; }
        public DateTime? deleted_at { get; set; }
        public DateTime? updated_at { get; set; }
        public DateTime? created_at { get; set; }
    }
}
