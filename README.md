# Library Management System

A full-stack web application designed for managing library books. It features a secure REST API backend built with .NET 8 (C#) and a dynamic, beautifully styled frontend built with Angular 17.

## Features

- **User Authentication:** 
  - Secure Registration and Login using JWT (JSON Web Tokens).
  - Passwords are securely hashed.
- **Book Management (CRUD):** 
  - Authenticated users can View all books.
  - Users can Add new books with details like Title, Author, ISBN, Publication Date, and Description.
  - Edit and Delete functionality is securely restricted to the user who originally created the book.
- **Modern UI:** 
  - Custom-designed, premium CSS aesthetic with glassmorphism, smooth animations, and a dark-theme presentation.
  - Fully responsive grid layouts.

## Technology Stack

### Backend
- **Framework:** .NET 8 Web API
- **Language:** C#
- **Database:** SQLite (for easy portability during development)
- **ORM:** Entity Framework Core
- **Authentication:** JWT Bearer Authentication

### Frontend
- **Framework:** Angular 17+ (Standalone Components)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (Custom modern design)
- **Routing:** Angular Router with AuthGuards
- **State/Reactivity:** Angular Signals and RxJS
- **Forms:** Angular Reactive Forms

## Prerequisites

To run this application, you need the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

---

## Getting Started

### 1. Setup the Backend API
Navigate to the backend project directory and run the application. Entity Framework migrations will automatically apply to the SQLite database.

```bash
cd backend/backend
dotnet restore
dotnet run
```
*The backend API will start on: `http://localhost:5000`*

### 2. Setup the Frontend Angular App
Open a new terminal, navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd frontend
npm install
npm start
```
*The frontend application will start on: `http://localhost:4200`*

## Usage

1. Open your browser and navigate to `http://localhost:4200`.
2. Click **Sign up now** to create a new account, or **Sign In** if you already have one.
3. Once logged in, you will be redirected to your dashboard where you can see all books.
4. Click **+ Add New Book** to open the form and add a book to the library.
5. You will only see the **Edit (Pencil)** and **Delete (Trash)** icons on books that *you* have created. Click them to modify or remove your entries.

## Project Structure

- `/backend`: The .NET Web API containing Controllers, Models, DTOs, Services, and DB Migrations.
- `/frontend`: The Angular application containing Standalone components (Login, Register, BookList, BookForm, EditBook), Route Guards, and Services.
