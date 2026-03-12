import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book, BookDto } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit {
  bookForm: FormGroup;
  isEditing = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      isbn: ['', [Validators.maxLength(50)]],
      publicationDate: [null],
      description: ['', [Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    // Optionally pre-fill form if editing an existing book. We can get the data passed via router state.
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['book']) {
      const book: Book = navigation.extras.state['book'];
      this.isEditing.set(true);
      this.bookId = book.id;
      
      // Format date for the input
      let formattedDate = null;
      if (book.publicationDate) {
         formattedDate = new Date(book.publicationDate).toISOString().split('T')[0];
      }

      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publicationDate: formattedDate,
        description: book.description
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const dto: BookDto = this.bookForm.value;

    if (this.isEditing() && this.bookId !== null) {
      this.bookService.updateBook(this.bookId, dto).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/books']);
        },
        error: (err) => {
          this.isLoading.set(false);
          const msg = err.error?.error || 'Failed to update book. Please try again.';
          this.errorMessage.set(msg);
        }
      });
    } else {
      this.bookService.createBook(dto).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/books']);
        },
        error: (err) => {
          this.isLoading.set(false);
          const msg = err.error?.error || 'Failed to add book. Please try again.';
          this.errorMessage.set(msg);
        }
      });
    }
  }
}

