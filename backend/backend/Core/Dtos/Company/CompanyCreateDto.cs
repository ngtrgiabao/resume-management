using backend.Enums;

namespace backend.Core.Dtos.Company;

public class CompanyCreateDto
{
    public string Name { get; set; }
    public CompanySizeEnum Size { get; set; } 
}