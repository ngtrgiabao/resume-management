using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }
        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {
            CompanyEntity newCompany = _mapper.Map<CompanyEntity>(dto);
            await _context.Companies.AddAsync(newCompany);
            await _context.SaveChangesAsync();

            return Ok("Company Created Successfully");
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {
            var companies = await _context.Companies.OrderByDescending(company => company.createdAt).ToListAsync();
            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);
            return Ok(convertedCompanies);
        }
    }
}
