using backend.Enums;

namespace backend.Core.Dtos.Job;

public class JobGetDto
{
    public long Id { get; set; }
    public string Title { get; set; }
    public JobLevelEnum Level { get; set; }
    public long CompanyId { get; set; }
    public string CompanyName {get; set; }
    public DateTime createAt { get; set; }
}