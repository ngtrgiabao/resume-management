
using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Candidate;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile? pdfFile)
        {
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMineType = "application/pdf";

            if (pdfFile != null && (pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMineType))
            {
                return BadRequest("File is not valid");
            }
            
            string resumeUrl = null;
            
            if (pdfFile != null)
            {
                resumeUrl = Guid.NewGuid().ToString() + ".pdf";
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await pdfFile.CopyToAsync(stream);
                }
            }


            var newCandidate = _mapper.Map<CandidateEntity>(dto);
            newCandidate.resumeUrl = resumeUrl;
            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate Saved Successfully");
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidates()
        {
            var candidates = await _context.Candidates.Include(c => c.Job).OrderByDescending(candidate => candidate.createdAt ).ToListAsync();
            var convertedCandidates = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);
            return Ok(convertedCandidates);
        }

        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }
    }
}