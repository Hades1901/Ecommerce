import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { LoginInput, useLoginMutation } from "../generated/graphql";
import { mapFielError } from "../Helper/mapFieldError";

const login = () => {
  const router = useRouter();

  const initialValues: LoginInput = {
    email: "",
    password: "",
  };

  const [loginUser, { loading: _loginUserLoading, data, error }] =
    useLoginMutation();

  const onRegisterSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
    });
    if (response.data.login.error) {
      setErrors(mapFielError(response.data.login.error));
    } else if (response.data?.login.user) {
      router.push("/");
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
              {({ isSubmitting }) => (
                <Form>
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
                  {data && !data.login.success && (
                    <Center>
                      <Text
                        fontSize={14}
                        pt="6"
                        fontWeight="extrabold"
                        color="red.500"
                      >
                        {data.login.message}
                      </Text>
                    </Center>
                  )}
                  <Center>
                    <Button
                      w="100%"
                      mt={12}
                      py={6}
                      _hover={{ bgColor: "#3BADCD", transition: "0.75s" }}
                      type="submit"
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

export default login;
