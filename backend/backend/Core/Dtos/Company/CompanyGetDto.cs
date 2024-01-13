using System.ComponentModel.DataAnnotations;
using backend.Core.Entities;
using backend.Enums;

namespace backend.Core.Dtos.Company;

public class CompanyGetDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public CompanySizeEnum Size { get; set; }
    public DateTime createdAt { get; set; }
}