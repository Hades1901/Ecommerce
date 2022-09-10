import { Box, Button, Center, Checkbox, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { RegisterInput, useRegisterMutation } from "../generated/graphql";
import { mapFielError } from "../Helper/mapFieldError";

const register = () => {
  const router = useRouter();

  const initialValues: RegisterInput = {
    username: "",
    email: "",
    password: "",
  };

  const [registerUser, { loading: _registerUserLoading, data, error }] =
    useRegisterMutation();

  const onRegisterSubmit = async (
    values: RegisterInput,
    { setErrors }: FormikHelpers<RegisterInput>
  ) => {
    const response = await registerUser({
      variables: {
        registerInput: values,
      },
    });
    if (!response.data?.register.success) {
      setErrors(mapFielError(response.data?.register.error));
    } else if (response.data?.register.user) {
      router.push("/login");
    }
  };

  const showToast = async () => {
    if (!data.register.success) {
      return toast.error(data.register.message);
    } else {
      return toast.success("You have created an Account");
    }
  };

  return (
    <Container
      backgroundImage="url('https://images.unsplash.com/photo-1574169208383-fb087432973a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
      bgPos="center"
      bgSize="cover"
      w="100%"
      h="100vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor="#51C8BC"
        w="1000px"
        h="500px"
        borderRadius="26px"
      >
        <Box display="flex" justifyContent="center" alignItems="center" w="40%">
          <Heading textAlign="center" color="white">
            Defy the Past <br />
            Step into the <br /> Future
          </Heading>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          bgColor="white"
          borderRadius="26px"
          height="100%"
          w="60%"
        >
          <Box w="70%">
            <Heading>Create Account</Heading>
            <Formik initialValues={initialValues} onSubmit={onRegisterSubmit}>
              {({ isSubmitting, handleChange, handleBlur }) => (
                <Form>
                  <Box my={4}>
                    <InputField
                      name="username"
                      type="text"
                      placeholder="UserName"
                    ></InputField>
                  </Box>

                  <Box my={4}>
                    <InputField
                      name="email"
                      type="email"
                      placeholder="Email"
                    ></InputField>
                  </Box>
                  <Box my={4}>
                    <InputField
                      name="password"
                      type="password"
                      placeholder="Password"
                    ></InputField>
                  </Box>

                  <Checkbox>
                    <Center fontSize="14px">
                      I have read and agreed to the Terms of Service and <br />{" "}
                      Privacy Policy
                    </Center>
                  </Checkbox>
                  {/* {data && !data.register.success && } */}
                  <ToastContainer />
                  <Center>
                    <Button
                      w="100%"
                      mt={8}
                      py={6}
                      _hover={{ bgColor: "#3BADCD", transition: "0.75s" }}
                      type="submit"
                      onClick={showToast}
                      isLoading={isSubmitting}
                    >
                      Create Account
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default register;
