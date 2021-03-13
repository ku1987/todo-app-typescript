import * as yup from 'yup';

const schema = yup.object().shape({
  userId: yup.string().required(),
  password: yup.string().required(),
});

interface User {
  userId: string;
  password: string;
}

export const userValidator = async (user: User) => {
  try {
    const result = await schema.validate(user);
    return result;
  } catch (error) {
    console.error(error.name);
    console.log(error.errors);
    return false;
  }
};
