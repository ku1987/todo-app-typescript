import * as yup from 'yup';

const schema = yup.object().shape({
  userId: yup.string().required(),
  accessKey: yup.string().required(),
  secretKey: yup.string().required(),
});

interface Key {
  userId: string;
  accessKey: string;
  secretKey: string;
}

export const keyValidator = async (key: Key) => {
  try {
    const result = await schema.validate(key);
    return result;
  } catch (error) {
    console.error(error.name);
    console.log(error.errors);
    return false;
  }
};
