// DTOs/EntertainerSummaryDTO.cs
namespace WaterProject.API.DTOs
{
    public class EntertainerSummaryDTO
    {
        public int EntertainerID { get; set; }
        public string EntStageName { get; set; }
        public int TotalBookings { get; set; }
        public string? LastBookingDate { get; set; }
    }
}
