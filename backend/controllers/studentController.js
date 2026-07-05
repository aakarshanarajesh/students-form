import { StudentService } from '../services/studentService.js';

// SRP: the controller only adapts the student workflow to the GraphQL layer.
export function createStudentController(studentService = new StudentService()) {
  return {
    async getStudents() {
      return studentService.getStudents();
    },

    async getStudentById(id) {
      return studentService.getStudentById(id);
    },

    async searchStudents(name) {
      return studentService.searchStudents(name);
    },

    async addStudent(input) {
      return studentService.registerStudent(input);
    }
  };
}
