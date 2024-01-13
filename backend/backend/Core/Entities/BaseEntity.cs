using System.ComponentModel.DataAnnotations;

namespace backend.Core.Entities;

public abstract class BaseEntity
{
    [Key]
    public long Id { get; set; }
    public DateTime? createdAt { get; set; } = DateTime.Now;
    public DateTime? updatedAt { get; set; } = DateTime.Now;
    public bool isActive { get; set; } = true;
}