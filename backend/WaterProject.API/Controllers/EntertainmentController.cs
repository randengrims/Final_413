using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Added for LINQ methods like ToListAsync
using WaterProject.API.Data;
using WaterProject.API.DTOs; // Added for EntertainerSummaryDTO

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainmentController : ControllerBase
    {
        private EntertainersDBContext _entertainmentContext;

        public EntertainmentController(EntertainersDBContext temp) => _entertainmentContext = temp;

        [HttpGet("AllEntertainers")]
        public IActionResult GetEntertainers(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? entertainerTypes = null)
        {
            var query = _entertainmentContext.Entertainers.AsQueryable();

            if (entertainerTypes != null && entertainerTypes.Any())
            {
                query = query.Where(b => entertainerTypes.Contains(b.EntZipCode));
            }

            var totalNumEntertainers = query.Count();

            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var someObject = new
            {
                entertainers = something,
                TotalNumEntertainers = totalNumEntertainers
            };

            return Ok(someObject);
        }

        [HttpGet("GetEntertainerTypes")]
        public IActionResult GetEntertainerTypes()
        {
            var entertainerTypes = _entertainmentContext.Entertainers
                .Select(b => b.EntZipCode)
                .Distinct()
                .ToList();

            return Ok(entertainerTypes);
        }

        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _entertainmentContext.Entertainers.Add(newEntertainer);
            _entertainmentContext.SaveChanges();
            return Ok(newEntertainer);
        }

        [HttpPut("UpdateEntertainer/{entertainerID}")] // make sure entertainerID isn't supposed to have a capital E
        public IActionResult UpdateEntertainer(int EntertainerID, [FromBody] Entertainer updatedEntertainer)
        {
            var existingEntertainer = _entertainmentContext.Entertainers.Find(EntertainerID);

            existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
            existingEntertainer.EntSSN = updatedEntertainer.EntSSN;
            existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existingEntertainer.EntCity = updatedEntertainer.EntCity;
            existingEntertainer.EntState = updatedEntertainer.EntState;
            existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
            existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            existingEntertainer.DateEntered = updatedEntertainer.DateEntered;

            _entertainmentContext.Entertainers.Update(existingEntertainer);
            _entertainmentContext.SaveChanges();

            return Ok(existingEntertainer);
        }

        [HttpDelete("DeleteEntertainer/{EntertainerID}")]
        public IActionResult DeleteEntertainer(int EntertainerID)
        {
            var entertainer = _entertainmentContext.Entertainers.Find(EntertainerID);

            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            _entertainmentContext.Entertainers.Remove(entertainer);
            _entertainmentContext.SaveChanges();

            return NoContent();
        }

        [HttpGet("EntertainerSummaries")]
        public IActionResult GetEntertainerSummaries()
        {
            var summaries = _entertainmentContext.Entertainers
                .Select(e => new EntertainerSummaryDTO
                {
                    EntertainerID = e.EntertainerID,
                    EntStageName = e.EntStageName,
                    TotalBookings = _entertainmentContext.Engagements.Count(eng => eng.EntertainerID == e.EntertainerID),
                    LastBookingDate = _entertainmentContext.Engagements
                                .Where(eng => eng.EntertainerID == e.EntertainerID)
                                .OrderByDescending(eng => eng.StartDate)
                                .Select(eng => eng.StartDate)
                                .FirstOrDefault()
            })
            .ToList();

            return Ok(summaries);
        }
    }
}
