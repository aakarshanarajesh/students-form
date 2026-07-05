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
