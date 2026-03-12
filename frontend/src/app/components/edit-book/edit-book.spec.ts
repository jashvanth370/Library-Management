import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EditBook } from './edit-book';

describe('EditBook Component', () => {
  let component: EditBook;
  let fixture: ComponentFixture<EditBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBook, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(EditBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
