using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Context;

public class ApplicationDbContext: DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<CompanyEntity> Companies { get; set; }
    public DbSet<JobEntity> Jobs { get; set;}
    public DbSet<CandidateEntity> Candidates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<JobEntity>()
            .HasOne(
            job => job.Company)
            .WithMany(company => company.Jobs)
            .HasForeignKey(job => job.CompanyId);
        
        modelBuilder.Entity<CandidateEntity>()
            .HasOne(candidate => candidate.Job)
            .WithMany(job => job.Candidates)
            .HasForeignKey(candidates => candidates.JobId);

        modelBuilder.Entity<CompanyEntity>()
            .Property(company => company.Size)
            .HasConversion<string>();

        modelBuilder.Entity<JobEntity>()
            .Property(job => job.Level)
            .HasConversion<string>();
    }
}