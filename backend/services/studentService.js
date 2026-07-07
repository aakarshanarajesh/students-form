import { StudentRepository } from '../repositories/studentRepository.js';
import { StudentValidator } from '../validators/studentValidator.js';

/**
 * StudentService contains the business rules for managing students.
 * It validates input, checks for duplicates, and delegates persistence to the repository.
 */
export class StudentService {
  /**
   * @param {StudentRepository} studentRepository
   * @param {StudentValidator} studentValidator
   */
  constructor(
    studentRepository = new StudentRepository(),
    studentValidator = new StudentValidator()
  ) {
    this.studentRepository = studentRepository;
    this.studentValidator = studentValidator;
  }

  async getStudents() {
    return this.studentRepository.getAllStudents();
  }

  async getStudentById(id) {
    const validId = this.studentValidator.validateStudentId(id);
    return this.studentRepository.getStudentById(validId);
  }

  async searchStudents(name) {
    return this.studentRepository.searchStudentsByName(name);
  }

  async registerStudent(input) {
    const normalizedInput = this.studentValidator.validateStudentInput(input);

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
    const validId = this.studentValidator.validateStudentId(id);
    const normalizedInput = this.studentValidator.validateUpdateStudentInput(input);

    const student = await this.studentRepository.getStudentById(validId);
    if (!student) {
      throw new Error('Student not found.');
    }

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
    const validId = this.studentValidator.validateStudentId(id);

    const student = await this.studentRepository.getStudentById(validId);
    if (!student) {
      throw new Error('Student not found.');
    }

    return this.studentRepository.deleteStudent(validId);
  }
}
