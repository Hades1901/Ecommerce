import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { useField } from "formik";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
}

const InputField = (props: InputFieldProps) => {

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <Input borderWidth="0 0 2px 0" id={field.name} {...field} {...props} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
