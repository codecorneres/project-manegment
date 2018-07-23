import { FormGroup } from '@angular/forms';
export class Registration {
	static validate(registrationFormGroup: FormGroup) {
        let newpassword = registrationFormGroup.controls.newpassword.value;
        let repeatPassword = registrationFormGroup.controls.repeatPassword.value;

 		if (newpassword.length <= 5) {

            return {
                minlength: true
            };
        }
        if (repeatPassword.length <= 0) {
            return null;
        }
 
        if (repeatPassword !== newpassword) {
            return {
                doesMatchPassword: true
            };
        }
        return null;
    }
}
