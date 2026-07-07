import { StudentController } from '../controllers/studentController.js';
import { StudentService } from '../services/studentService.js';
import { StudentRepository } from '../repositories/studentRepository.js';
import { StudentValidator } from '../validators/studentValidator.js';

// SRP: GraphQL resolvers delegate to the controller layer only.
const studentController = new StudentController(
  new StudentService(new StudentRepository(), new StudentValidator())
);

export const studentResolvers = {
  Query: {
    getStudents: async () => studentController.getStudents(),
    getStudentById: async (_root, { id }) => studentController.getStudentById(id),
    searchStudents: async (_root, { name }) => studentController.searchStudents(name)
  },
  Mutation: {
    addStudent: async (_root, { input }) => studentController.addStudent(input),
    updateStudent: async (_root, { id, input }) => studentController.updateStudent(id, input),
    deleteStudent: async (_root, { id }) => studentController.deleteStudent(id)
  }
};
