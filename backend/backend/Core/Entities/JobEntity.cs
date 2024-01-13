using backend.Enums;

namespace backend.Core.Entities;

public class JobEntity : BaseEntity
{
    public string Title { get; set; }
    public JobLevelEnum Level { get; set; }
    
    // 1 - 1
    public long CompanyId { get; set; }
    public CompanyEntity Company { get; set; }
    
    public ICollection<CandidateEntity> Candidates { get; set; } 
}