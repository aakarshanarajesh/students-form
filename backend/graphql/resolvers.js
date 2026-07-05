import Student from '../models/studentModel.js';

// GraphQL resolvers for reading, searching, and creating student records.
export const studentResolvers = {
  Query: {
    getStudents: async () => {
      return Student.find().sort({ createdAt: -1 });
    },
    getStudentById: async (_root, { id }) => {
      return Student.findById(id);
    },
    searchStudents: async (_root, { name }) => {
      return Student.find({ fullName: { $regex: name, $options: 'i' } }).sort({ createdAt: -1 });
    }
  },
  Mutation: {
    addStudent: async (_root, { input }) => {
      const normalizedEmail = input.email.trim().toLowerCase();
      const existingStudent = await Student.findOne({
        $or: [{ studentId: input.studentId.trim() }, { email: normalizedEmail }]
      });

      if (existingStudent) {
        if (existingStudent.studentId === input.studentId.trim()) {
          throw new Error('A student with this Student ID already exists.');
        }
        throw new Error('A student with this email already exists.');
      }

      const student = new Student({
        ...input,
        studentId: input.studentId.trim(),
        email: normalizedEmail,
        phone: input.phone.trim()
      });

      await student.save();
      return student;
    }
  }
};
