using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entity
{
    [Table("Photos")]//We call the Table name in DB Photos like this
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; }

        //This is known as fully defining the relationship between our AppUser and Photos class.
        public AppUser AppUser { get; set; }

        public int AppUserId { get; set; }


    }
}