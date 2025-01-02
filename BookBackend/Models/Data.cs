using System.Collections.Generic;

namespace BookBackend.Models
{
    public class Data
    {
        public List<Book> Books { get; set; } = new List<Book>();

        public List<User> Users { get; set; } = new List<User>();
    }
}
