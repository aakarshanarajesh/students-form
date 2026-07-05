import { StudentRepository } from '../repositories/studentRepository.js';
import { validateStudentInput } from '../validators/studentValidator.js';

// SRP: business rules for student registration live in the service layer.
// DIP: the service depends on a repository abstraction instead of the Mongoose model directly.
// Composition is preferred over inheritance here, so the service receives a repository instance rather than extending a base class.
export class StudentService {
  constructor(studentRepository = new StudentRepository()) {
    this.studentRepository = studentRepository;
  }

  async getStudents() {
    return this.studentRepository.getAllStudents();
  }

  async getStudentById(id) {
    return this.studentRepository.getStudentById(id);
  }

  async searchStudents(name) {
    return this.studentRepository.searchStudentsByName(name);
  }

  async registerStudent(input) {
    const normalizedInput = validateStudentInput(input);

    const existingStudent = await this.studentRepository.findStudentByStudentIdOrEmail(
      normalizedInput.studentId,
      normalizedInput.email
    );

    if (existingStudent) {
      if (existingStudent.studentId === normalizedInput.studentId) {
        throw new Error('A student with this Student ID already exists.');
      }
      throw new Error('A student with this email already exists.');
    }

    return this.studentRepository.createStudent(normalizedInput);
  }
}
