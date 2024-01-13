namespace backend.Core.Dtos.Job;

public class JobCreateDto
{
    public string Title { get; set; }
    public JobLevelEnum Level { get; set; }
    public long CompanyId { get; set; }
}