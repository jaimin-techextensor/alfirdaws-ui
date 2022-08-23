import { AbstractControl } from "@angular/forms"

export const PasswordStrengthValidator = function (control: AbstractControl): any {
  let value: string = control.value || '';
  if (!value) {
    return null
  }

  let letters = /^(?=.*[A-Za-z])(?=.*[0-9])+/g
  if (letters.test(value) === false) {
    return { passwordStrength: `Letters and numbers are required.` };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === true) {
    return { passwordStrength: `Special char not allowed.` };
  }

  return null;
}
