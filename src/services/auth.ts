import { LoginFormInputs, RegisterFormInputs } from '../types/forms';

const auth = {
  register: (data: RegisterFormInputs) => {
    console.log(data);
  },
  login: (data: LoginFormInputs) => {
    console.log(data);
  },
};

export default auth;
