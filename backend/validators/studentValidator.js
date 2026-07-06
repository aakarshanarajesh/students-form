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

export function validateStudentId(studentId) {
  if (!studentId || typeof studentId !== 'string') {
    throw new Error('Valid student ID is required.');
  }

  return studentId.trim();
}

export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new Error('Valid email is required.');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error('Invalid email format.');
  }

  return normalizedEmail;
}

export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    throw new Error('Valid phone number is required.');
  }

  const normalizedPhone = phone.trim();
  const phoneRegex = /^\d{10,15}$/;
  
  if (!phoneRegex.test(normalizedPhone)) {
    throw new Error('Phone number must contain 10 to 15 digits.');
  }

  return normalizedPhone;
}

export function validateUpdateStudentInput(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('Student input is required.');
  }

  const normalized = {};

  if (input.fullName !== undefined) {
    normalized.fullName = input.fullName.trim();
  }

  if (input.studentId !== undefined) {
    normalized.studentId = input.studentId.trim();
  }

  if (input.email !== undefined) {
    normalized.email = validateEmail(input.email);
  }

  if (input.phone !== undefined) {
    normalized.phone = validatePhone(input.phone);
  }

  if (input.department !== undefined) {
    normalized.department = input.department.trim();
  }

  if (input.course !== undefined) {
    normalized.course = input.course.trim();
  }

  if (input.yearOfStudy !== undefined) {
    normalized.yearOfStudy = input.yearOfStudy.trim();
  }

  if (input.address !== undefined) {
    normalized.address = input.address.trim();
  }

  if (input.age !== undefined) {
    normalized.age = input.age;
  }

  if (input.gender !== undefined) {
    normalized.gender = input.gender.trim();
  }

  return normalized;
}
