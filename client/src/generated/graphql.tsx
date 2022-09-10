import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type FileError = {
  __typename?: 'FileError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type IMutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct?: Maybe<ProductMutationResponse>;
  login?: Maybe<UserMutationResponse>;
  logout: Scalars['Boolean'];
  register?: Maybe<UserMutationResponse>;
  updateProduct: ProductMutationResponse;
};


export type MutationCreateProductArgs = {
  createProductInput: ProductInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdateProductArgs = {
  updatePostInput: UpdatePostInput;
};

export type Product = {
  __typename?: 'Product';
  createAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['String'];
  updateAt: Scalars['DateTime'];
};

export type ProductInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
};

export type ProductMutationResponse = IMutationResponse & {
  __typename?: 'ProductMutationResponse';
  code: Scalars['Float'];
  error?: Maybe<Array<FileError>>;
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  deleteAllProduct: Array<Product>;
  deleteOneProduct: ProductMutationResponse;
  getOneProduct: ProductMutationResponse;
  getProducts: Array<Product>;
  test: Scalars['String'];
};


export type QueryDeleteOneProductArgs = {
  id: Scalars['ID'];
};


export type QueryGetOneProductArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdatePostInput = {
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  updateAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  error?: Maybe<Array<FileError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type FieldErrorFragment = { __typename?: 'FileError', field?: string | null, message: string };

export type MutationStatusFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type UserInfoFragment = { __typename?: 'User', id: string, username: string, email: string };

export type UserMutationFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null, error?: Array<{ __typename?: 'FileError', field?: string | null, message: string }> | null };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null, error?: Array<{ __typename?: 'FileError', field?: string | null, message: string }> | null } | null };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, username: string, email: string } | null, error?: Array<{ __typename?: 'FileError', field?: string | null, message: string }> | null } | null };

export const MutationStatusFragmentDoc = gql`
    fragment mutationStatus on UserMutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  email
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FileError {
  field
  message
}
    `;
export const UserMutationFragmentDoc = gql`
    fragment userMutation on UserMutationResponse {
  ...mutationStatus
  user {
    ...userInfo
  }
  error {
    ...fieldError
  }
}
    ${MutationStatusFragmentDoc}
${UserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMutation
  }
}
    ${UserMutationFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ...userMutation
  }
}
    ${UserMutationFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;