using AutoMapper;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<CompanyCreateDto, CompanyEntity>();
        CreateMap<CompanyEntity, CompanyGetDto>();

        CreateMap<JobCreateDto, JobEntity>();
        CreateMap<JobEntity, JobGetDto>()
            .ForMember(dest => dest.CompanyName, opt
                => opt.MapFrom(src => src.Company.Name));
    }
}