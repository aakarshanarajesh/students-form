import { createStudentController } from '../controllers/studentController.js';

// SRP: GraphQL resolvers delegate to the controller layer only.
const studentController = createStudentController();

export const studentResolvers = {
  Query: {
    getStudents: async () => studentController.getStudents(),
    getStudentById: async (_root, { id }) => studentController.getStudentById(id),
    searchStudents: async (_root, { name }) => studentController.searchStudents(name)
  },
  Mutation: {
    addStudent: async (_root, { input }) => studentController.addStudent(input)
  }
};
