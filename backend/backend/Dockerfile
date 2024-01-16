# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /base-netcore
COPY . .
RUN dotnet restore "./backend.csproj"
RUN dotnet publish "./backend.csproj" -c release -o /app --no-restore

# Serve Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./
EXPOSE 5282
ENV ASPNETCORE_URLS=http://*:5282 
ENTRYPOINT ["dotnet", "backend.dll"]
