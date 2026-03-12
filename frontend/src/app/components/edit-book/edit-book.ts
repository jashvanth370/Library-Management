import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookDto } from '../../models/book.model';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: '../book-form/book-form.html',
  styleUrls: ['../book-form/book-form.css'],
})
export class EditBook implements OnInit {
  bookForm: FormGroup;
  isEditing = signal(true);
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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.bookId = +idParam;
      this.loadBook(this.bookId);
    } else {
      this.errorMessage.set('Invalid book ID');
    }
  }

  loadBook(id: number): void {
    this.isLoading.set(true);
    this.bookService.getMyBooks().subscribe({
      next: (books) => {
        const book = books.find(b => b.id === id);
        if (book) {
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
        } else {
          this.errorMessage.set('Book not found');
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load book details');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    if (this.bookId === null) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const dto: BookDto = this.bookForm.value;

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
  }
}

