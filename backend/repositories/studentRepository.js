import Student from '../models/studentModel.js';

// SRP: persistence logic for students lives in the repository layer.
// OCP: this repository can be replaced or extended later for new entities without changing the service layer.
export class StudentRepository {
  constructor(model = Student) {
    this.model = model;
  }

  async getAllStudents() {
    return this.model.find().sort({ createdAt: -1 });
  }

  async getStudentById(id) {
    return this.model.findById(id);
  }

  async searchStudentsByName(name) {
    return this.model.find({ fullName: { $regex: name, $options: 'i' } }).sort({ createdAt: -1 });
  }

  async findStudentByStudentIdOrEmail(studentId, email) {
    return this.model.findOne({
      $or: [{ studentId }, { email }]
    });
  }

  async findStudentByStudentIdOrEmailExcluding(studentId, email, excludeId) {
    return this.model.findOne({
      $and: [
        { _id: { $ne: excludeId } },
        {
          $or: [{ studentId }, { email }]
        }
      ]
    });
  }

  async createStudent(studentData) {
    const student = new this.model(studentData);
    await student.save();
    return student;
  }

  async updateStudent(id, studentData) {
    return this.model.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
  }

  async deleteStudent(id) {
    return this.model.findByIdAndDelete(id);
  }
}
