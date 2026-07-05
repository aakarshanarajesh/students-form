# Student Registration System

## Overview

A full-stack Student Registration System built with modern web technologies for managing student records efficiently. The application provides features for registering students, searching by name, and viewing all registered students with a responsive user interface.

## Features

- Student Registration with validation
- Search students by full name
- View all registered students
- GraphQL API for data operations
- MongoDB Atlas cloud database integration
- Responsive design using Tailwind CSS
- Real-time form validation
- Duplicate prevention for Student IDs and emails

## Tech Stack

### Frontend
- SvelteKit (Modern web framework)
- Tailwind CSS (Utility-first styling)
- Vite (Fast build tool)

### Backend
- Node.js (JavaScript runtime)
- Express.js (Web server)
- Apollo GraphQL (API layer)

### Database
- MongoDB Atlas (Cloud database)
- Mongoose (ODM for MongoDB)

## Project Structure

```
students-form/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── graphql/
│   │   ├── lib/
│   │   └── routes/
│   ├── package.json
│   ├── svelte.config.js
│   ├── vite.config.js
│   ├── .env.example
│   └── README.md
│
├── backend/
│   ├── config/
│   ├── graphql/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── .gitignore
├── README.md
└── LICENSE
```

## Local Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Clone Repository

```bash
git clone https://github.com/yourusername/students-form.git
cd students-form
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend will run on `http://localhost:4000` with GraphQL endpoint at `http://localhost:4000/graphql`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)

```
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
```

### Frontend (.env)

```
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

## Available Scripts

### Backend

- `npm run dev` - Start development server
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## GraphQL API

### Queries

```graphql
query GetStudents {
  getStudents {
    id
    fullName
    studentId
    email
    phone
    department
    course
    yearOfStudy
  }
}

query SearchStudents {
  searchStudents(name: "John") {
    id
    fullName
    email
  }
}
```

### Mutations

```graphql
mutation RegisterStudent {
  addStudent(input: {
    fullName: "John Doe"
    studentId: "STU001"
    email: "john@example.com"
    phone: "1234567890"
    age: 20
    gender: "Male"
    department: "Engineering"
    course: "Computer Science"
    yearOfStudy: "1st Year"
    address: "123 Main St"
  }) {
    id
    fullName
    email
  }
}
```

## Deployment

### Frontend - Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables (VITE_GRAPHQL_URL)
4. Deploy

### Backend - Render

1. Push code to GitHub
2. Create new web service on Render
3. Select repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables (PORT, MONGODB_URI)
7. Deploy

### Database - MongoDB Atlas

1. Create MongoDB Atlas account
2. Create a cluster
3. Create database user
4. Get connection string
5. Add IP whitelist
6. Update MONGODB_URI in .env

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
