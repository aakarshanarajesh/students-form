# Backend - Student Registration API

GraphQL API backend for the Student Registration System built with Node.js, Express, and Apollo Server.

## Installation

```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with password
4. Get your connection string
5. Add your IP to the IP Whitelist
6. Update `MONGODB_URI` in your `.env` file

Replace `username` and `password` with your actual MongoDB credentials.

## Running Locally

### Development

```bash
npm run dev
```

The server will start on `http://localhost:4000` (or your configured PORT)

GraphQL Playground will be available at `http://localhost:4000/graphql`

### Production

```bash
npm start
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── graphql/
│   ├── typeDefs.js        # GraphQL schema definitions
│   └── resolvers.js       # GraphQL resolver functions
├── models/
│   └── studentModel.js    # Mongoose Student schema
├── server.js              # Express app setup
├── package.json
└── .env.example
```

## GraphQL Schema

### Types

```graphql
type Student {
  id: ID!
  fullName: String!
  studentId: String!
  email: String!
  phone: String!
  age: Int!
  gender: String!
  department: String!
  course: String!
  yearOfStudy: String!
  address: String!
  createdAt: String!
  updatedAt: String!
}
```

### Queries

```graphql
getStudents: [Student!]!
getStudentById(id: ID!): Student
searchStudents(name: String!): [Student!]!
```

### Mutations

```graphql
addStudent(input: StudentInput!): Student!
```

## API Examples

### Get All Students

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ getStudents { id fullName email } }"}'
```

### Search Students

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ searchStudents(name: \"John\") { id fullName email } }"}'
```

### Create Student

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { addStudent(input: { fullName: \"John Doe\" studentId: \"STU001\" email: \"john@example.com\" phone: \"1234567890\" age: 20 gender: \"Male\" department: \"Engineering\" course: \"Computer Science\" yearOfStudy: \"1st Year\" address: \"123 Main St\" }) { id fullName email } }"
  }'
```

## Deployment to Render

1. Push code to GitHub repository
2. Sign up at https://render.com
3. Create new Web Service
4. Connect your GitHub repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment variables:
     - `PORT=4000`
     - `MONGODB_URI=your_connection_string`
6. Deploy

## Dependencies

- `@apollo/server` - GraphQL server
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `express` - Web framework
- `graphql` - GraphQL implementation
- `graphql-tag` - GraphQL template literals
- `mongoose` - MongoDB object modeling

## Features

- GraphQL API with Apollo Server
- MongoDB Atlas integration
- Student CRUD operations
- Full-text search by name
- Duplicate prevention (Student ID & Email)
- CORS enabled for frontend communication
- Environment-based configuration

## Error Handling

The API includes error handling for:
- Duplicate Student IDs
- Duplicate emails
- Invalid input data
- Database connection errors
- MongoDB validation errors

## License

MIT
