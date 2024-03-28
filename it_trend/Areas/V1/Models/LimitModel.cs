using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vue.Models
{
    [Table("limit")]
    public class LimitModel
    {
        [Key]
        public int id { get; set; }
        public int? alert_limit { get; set; }
        public int? action_limit { get; set; }
        public int? standard_limit { get; set; }
        public int? target_id { get; set; }
        public int? diagram_id { get; set; }
        public DateTime? date_effect { get; set; }
        public DateTime? deleted_at { get; set; }
        public DateTime? updated_at { get; set; }
        public DateTime? created_at { get; set; }
    }
}
