using backend.Enums;

namespace backend.Core.Entities;

public class CompanyEntity : BaseEntity
{
    public string Name { get; set; }
    public CompanySizeEnum Size { get; set; }
    
    public ICollection<JobEntity> Jobs { get; set; }
}