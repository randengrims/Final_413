using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WaterProject.API.Data
{
    public class Engagement
    {
        [Key]
        public int EngagementNumber { get; set; } // just adding a get makes it a read-only
        [Required]
        public string StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? StartTime { get; set; }
        public string? StopTime { get; set; }
        public int? ContractPrice { get; set; }
        public int? CustomerID { get; set; } // This is also a foreign key to another table, but I don't know if I need to put that
        public int? AgentID { get; set; } // This is also a foreign key to another table, but I don't know if I need to put that
        [ForeignKey("EntertainerID")]
        public int EntertainerID { get; set; } // Foreign key to the Entertainer table
    }
}
