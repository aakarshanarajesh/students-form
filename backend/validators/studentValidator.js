// SRP: input normalization and validation are isolated here so the service stays focused on business rules.
export function validateStudentInput(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('Student input is required.');
  }

  return {
    ...input,
    fullName: input.fullName?.trim() ?? '',
    studentId: input.studentId?.trim() ?? '',
    email: input.email?.trim().toLowerCase() ?? '',
    phone: input.phone?.trim() ?? '',
    department: input.department?.trim() ?? '',
    course: input.course?.trim() ?? '',
    yearOfStudy: input.yearOfStudy?.trim() ?? '',
    address: input.address?.trim() ?? ''
  };
}
