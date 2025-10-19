using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class RealEstateDbContext : DbContext
    {
        public RealEstateDbContext(DbContextOptions<RealEstateDbContext> options) : base(options)
        {
        }

        public virtual DbSet<AdditionalEstateInfo> AdditionalEstateInfos => Set<AdditionalEstateInfo>();
        public virtual DbSet<Agency> Agencies => Set<Agency>();
        public virtual DbSet<City> Cities => Set<City>();
        public virtual DbSet<Estate> Estates => Set<Estate>();
        public virtual DbSet<Images> Images => Set<Images>();
        public virtual DbSet<CodeAuthorization> CodeAuthorization => Set<CodeAuthorization>();
        public virtual DbSet<MailLog> MailLogs => Set<MailLog>();
        public virtual DbSet<Telephone> Telephones => Set<Telephone>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AdditionalEstateInfo>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Agency>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Agency>()
                .HasMany(x => x.Estates)
                .WithOne(x => x.Agency)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Agency>()
                .HasMany(x => x.Telephones)
                .WithOne(x => x.Agency)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<City>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Estate>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Estate>()
                .HasMany(x => x.Images)
                .WithOne(x => x.Estate)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Estate>()
                .HasMany(x => x.AdditionalEstateInfo)
                .WithOne(x => x.Estate)
                .OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Images>()
            //    .Property(x => x.Id)
            //    .ValueGeneratedOnAdd();

            modelBuilder.Entity<CodeAuthorization>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<MailLog>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Telephone>()
                .Property(x => x.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
