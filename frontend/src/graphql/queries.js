export const GET_STUDENTS_QUERY = `
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
`;

export const GET_STUDENT_BY_ID_QUERY = `
  query GetStudentById($id: ID!) {
    getStudentById(id: $id) {
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
      updatedAt
    }
  }
`;

export const SEARCH_STUDENTS_QUERY = `
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
`;

export const ADD_STUDENT_MUTATION = `
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
`;

export const UPDATE_STUDENT_MUTATION = `
  mutation UpdateStudent($id: ID!, $input: UpdateStudentInput!) {
    updateStudent(id: $id, input: $input) {
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
      updatedAt
    }
  }
`;

export const DELETE_STUDENT_MUTATION = `
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id) {
      id
      fullName
      studentId
    }
  }
`;
