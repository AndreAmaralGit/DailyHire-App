export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'We need a valid email address.';

  return '';
};

export const existingEmail = email => {
  return 'Email already exists';
};

export const passwordValidator = password => {
  if (!password || password.length <= 3) return 'Password must be at least 4 digits.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const passwordWrong = password => {
  return 'Wrong password';
};

export const userWrong = email => {
  return 'User not found';
};

export const addressValidator = address => {
  if (!address || address.length <= 0) return 'Address cannot be empty.';

  return '';
};

export const phoneValidator = phoneNumber => {
  if (!phoneNumber || phoneNumber.length <= 8) return 'Phone number cannot be empty.';

  return '';
};

export const birthdateValidator = date => {
  if (!date || date.length <= 0) return 'Birthdate cannot be empty.';

  return '';
};

export const startDateValidator = date => {
  if (!date || date.length <= 0) return 'Start date cannot be empty.';

  return '';
};

export const endDateValidator = date => {
  if (!date || date.length <= 0) return 'End date cannot be empty.';

  return '';
};

export const workAreaValidator = text => {
  if (text == '') return 'Work area cannot be empty.';

  return '';
};

export const messageValidator = text => {
  if (text == '') return 'Message cannot be empty.';

  return '';
};
