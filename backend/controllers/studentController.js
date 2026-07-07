import { StudentService } from '../services/studentService.js';

/**
 * StudentController orchestrates student-related requests from GraphQL resolvers.
 * It exposes methods that map to service layer operations.
 */
export class StudentController {
  /**
   * @param {StudentService} studentService
   */
  constructor(studentService = new StudentService()) {
    this.studentService = studentService;
  }

  async getStudents() {
    return this.studentService.getStudents();
  }

  async getStudentById(id) {
    return this.studentService.getStudentById(id);
  }

  async searchStudents(name) {
    return this.studentService.searchStudents(name);
  }

  async addStudent(input) {
    return this.studentService.registerStudent(input);
  }

  async updateStudent(id, input) {
    return this.studentService.updateStudent(id, input);
  }

  async deleteStudent(id) {
    return this.studentService.deleteStudent(id);
  }
}
