namespace backend.Core.Dtos.Candidate;

public class CandidateCreateDto
{
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string Email { get; set; }
    public int Phone { get; set; }
    public string coverLetter { get; set; }
    public long JobId { get; set; }
}