/**
 * Validates if the given email is in a valid format based on a regular expression.
 *
 * @param {string} email - the email to be validated
 * @return {boolean} true if the email is valid, false otherwise
 */
export const validateEmail = (email) => {
  let emailState = true;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === "") {
    emailState = false;
  } else {
    emailState = emailRegex.test(email);
  }
  return emailState;
};
