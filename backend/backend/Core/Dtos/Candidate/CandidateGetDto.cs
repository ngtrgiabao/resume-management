namespace backend.Core.Dtos.Candidate;

public class CandidateGetDto
{
    public long Id { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string Email { get; set; }
    public int Phone { get; set; }
    public string coverLetter { get; set; }
    public string ResumeUrl { get; set; }
    public long JobId { get; set; }
    public string JobTitle { get; set; }
    public DateTime createdAt { get; set; }
    public DateTime updatedAt { get; set; }
}