import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    studentId: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    phone: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    department: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    yearOfStudy: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
