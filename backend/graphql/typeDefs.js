import gql from 'graphql-tag';

export const typeDefs = gql`
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

  input StudentInput {
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
  }

  type Query {
    getStudents: [Student!]!
    getStudentById(id: ID!): Student
    searchStudents(name: String!): [Student!]!
  }

  type Mutation {
    addStudent(input: StudentInput!): Student!
  }
`;
