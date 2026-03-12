namespace backend.DTOs
{
    public class BookDto
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Isbn { get; set; } = string.Empty;
        public DateTime? PublicationDate { get; set; }
        public string? Description { get; set; }
    }
}
