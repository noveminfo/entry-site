import React, { ReactElement } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

import Button from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { auth } from "../../firebase";

const FormContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-96
    border-2
    border-solid
    border-blue-600
    py-4
    px-8
  `}
`;

const InputField = styled.div`
  ${tw`
    flex
    flex-nowrap
    w-full
    py-3
  `}
`;

const InputLabel = styled.span`
  ${tw`
    w-1/4
    text-left
    text-black
  `}
`;

const ButtonField = styled.div`
  ${tw`
    w-full
    flex-1
    text-center
  `}
`;

const ErrorMessage = styled.p`
  ${tw`
    text-red-500
    text-sm
    
  `}
`;

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm(): ReactElement {
  const [showLoginError, setShowLoginError] = useState(false);
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onVaild = async (data: FormInput) => {
    await auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => history.push("/entrylist"))
      .catch((_) => setShowLoginError(true));
  };

  return (
    <FormContainer>
      {showLoginError && (
        <ErrorMessage>EmailまたはPasswordが正しくありません</ErrorMessage>
      )}
      <InputField>
        <InputLabel>Email</InputLabel>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput className={"w-60"} type="email" {...field} />
            )}
            rules={{
              required: "Email未入力",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "正しいEmailを入力ください",
              },
            }}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
      </InputField>
      <InputField>
        <InputLabel>Password</InputLabel>
        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput className={"w-60"} type="password" {...field} />
            )}
            rules={{ required: "Password未入力" }}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
      </InputField>
      <ButtonField>
        <Button
          text={"ログイン"}
          className={"w-36 my-6 py-2"}
          onClick={handleSubmit(onVaild)}
        />
      </ButtonField>
    </FormContainer>
  );
}
