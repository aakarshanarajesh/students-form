# Frontend - Student Registration UI

SvelteKit-based responsive user interface for the Student Registration System with Tailwind CSS styling.

## Installation

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

For production deployments on Vercel, set:

```
VITE_GRAPHQL_URL=https://students-form-backend.onrender.com/graphql
```

## Running Locally

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── StudentForm.svelte      # Registration form
│   │   ├── StudentTable.svelte     # Students table display
│   ├── graphql/
│   │   └── queries.js              # GraphQL queries & mutations
│   ├── lib/
│   │   └── graphql.js              # GraphQL client utility
│   ├── routes/
│   │   ├── +page.svelte            # Home page
│   │   ├── +layout.svelte          # Navigation layout
│   │   ├── register/
│   │   │   └── +page.svelte        # Registration page
│   │   ├── search/
│   │   │   └── +page.svelte        # Search page
│   │   └── students/
│   │       └── +page.svelte        # View all students page
│   ├── app.css                     # Global styles
│   └── app.html                    # HTML template
├── static/
├── package.json
├── svelte.config.js
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
└── .env.example
```

## Pages

### Home Page (`/`)
- Hero section with call-to-action buttons
- Links to register or view students

### Register Page (`/register`)
- Student registration form with validation
- Fields: Full Name, Student ID, Email, Phone, Age, Gender, Department, Course, Year of Study, Address
- Real-time validation feedback
- Success/error messages

### Search Page (`/search`)
- Search students by full name
- Real-time search results
- Responsive results display

### View Students Page (`/students`)
- Display all registered students
- Responsive table layout
- Student details: ID, Name, Email, Department, Course, Year

## Features

- Responsive design (mobile-first)
- Real-time form validation
- Email and phone number validation
- Client-side error handling
- Loading states
- Success messages
- Duplicate student prevention
- GraphQL integration
- Tailwind CSS styling

## GraphQL Queries

### Get All Students

```graphql
query GetStudents {
  getStudents {
    id
    fullName
    studentId
    email
    phone
    age
    gender
    department
    course
    yearOfStudy
    address
    createdAt
  }
}
```

### Search Students

```graphql
query SearchStudents($name: String!) {
  searchStudents(name: $name) {
    id
    fullName
    studentId
    email
    department
    course
    yearOfStudy
  }
}
```

### Add Student

```graphql
mutation AddStudent($input: StudentInput!) {
  addStudent(input: $input) {
    id
    fullName
    studentId
    email
    phone
    age
    gender
    department
    course
    yearOfStudy
    address
  }
}
```

## Deployment to Vercel

1. Push code to GitHub repository
2. Sign up at https://vercel.com
3. Import project from GitHub
4. Configure:
   - Framework: SvelteKit
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.svelte-kit/output`
5. Add Environment Variables:
   - `VITE_GRAPHQL_URL=https://your-backend-api.onrender.com/graphql`
6. Deploy

## Styling

The application uses Tailwind CSS for styling with:
- Utility-first approach
- Custom color scheme
- Responsive breakpoints
- Component-based design

## Form Validation

Client-side validation for:
- Required fields
- Email format
- Phone number format (10-15 digits)
- Age range (1-120)
- Duplicate Student ID
- Duplicate email

## Error Handling

- Network error messages
- Form validation errors
- GraphQL error responses
- Loading states
- User-friendly error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- `svelte` - UI framework
- `@sveltejs/kit` - Meta-framework
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes

## License

MIT
