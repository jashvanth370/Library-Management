import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookList implements OnInit {
  books = signal<Book[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  showLogoutModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  bookToDelete = signal<number | null>(null);

  constructor(
    private bookService: BookService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading.set(true);
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load books. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  confirmDelete(id: number): void {
    this.bookToDelete.set(id);
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.bookToDelete.set(null);
  }

  deleteBook(): void {
    const id = this.bookToDelete();
    if (id !== null) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books.update(books => books.filter(b => b.id !== id));
          this.showDeleteModal.set(false);
          this.bookToDelete.set(null);
        },
        error: (err) => {
          alert('Failed to delete the book.');
          this.showDeleteModal.set(false);
          this.bookToDelete.set(null);
        }
      });
    }
  }

  confirmLogout(): void {
    this.showLogoutModal.set(true);
  }

  cancelLogout(): void {
    this.showLogoutModal.set(false);
  }

  logout(): void {
    this.showLogoutModal.set(false);
    this.authService.logout();
  }
}

