import { StudentRepository } from '../repositories/studentRepository.js';
import { validateStudentInput, validateUpdateStudentInput, validateStudentId } from '../validators/studentValidator.js';

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
    const validId = validateStudentId(id);
    return this.studentRepository.getStudentById(validId);
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

  async updateStudent(id, input) {
    const validId = validateStudentId(id);
    const normalizedInput = validateUpdateStudentInput(input);

    // Check if student exists
    const student = await this.studentRepository.getStudentById(validId);
    if (!student) {
      throw new Error('Student not found.');
    }

    // Check for duplicate Student ID or Email during update
    if (normalizedInput.studentId || normalizedInput.email) {
      const existingStudent = await this.studentRepository.findStudentByStudentIdOrEmailExcluding(
        normalizedInput.studentId || student.studentId,
        normalizedInput.email || student.email,
        validId
      );

      if (existingStudent) {
        if (existingStudent.studentId === (normalizedInput.studentId || student.studentId)) {
          throw new Error('A student with this Student ID already exists.');
        }
        throw new Error('A student with this email already exists.');
      }
    }

    return this.studentRepository.updateStudent(validId, normalizedInput);
  }

  async deleteStudent(id) {
    const validId = validateStudentId(id);

    // Check if student exists
    const student = await this.studentRepository.getStudentById(validId);
    if (!student) {
      throw new Error('Student not found.');
    }

    return this.studentRepository.deleteStudent(validId);
  }
}
