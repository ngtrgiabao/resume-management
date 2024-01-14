namespace backend.Core.Entities;

public class CandidateEntity : BaseEntity
{
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string coverLetter { get; set; }
    public string? resumeUrl { get; set; }
    
    // 1 - 1
    public long JobId { get; set; }
    public JobEntity Job { get; set; }
}