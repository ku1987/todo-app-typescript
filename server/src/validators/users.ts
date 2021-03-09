import * as yup from 'yup';

const schema = yup.object().shape({
  userId: yup.string().required(),
});

interface User {
  userId: string;
}

export const userValidator = async (user: User): Promise<Boolean> => {
  schema.validate(user).catch((err) => {
    console.error(err.name);
    console.log(err.errors);
    return false;
  });
  return true;
};
