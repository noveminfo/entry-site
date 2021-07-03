import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Button from "../../components/Button";

const FormContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-96
    h-60
    border-2
    border-solid
    border-blue-600
    py-4
    px-6
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

const BaseInput = styled.input`
  ${tw`
    w-60
    px-2
    border-2
    border-solid
    border-blue-600
    text-black
    bg-white
    focus:outline-none
  `}
`;

const ButtonField = styled.div`
  ${tw`
    w-full
    h-1/2
  `}
`;

interface Props {}

export default function LoginForm({}: Props): ReactElement {
  return (
    <FormContainer>
      <InputField>
        <InputLabel>Email</InputLabel>
        <BaseInput />
      </InputField>
      <InputField>
        <InputLabel>Password</InputLabel>
        <BaseInput />
      </InputField>
      <ButtonField>
        <Button
          text={"ログイン"}
          className={"w-36 mx-auto mt-8"}
          onClick={() => null}
        />
      </ButtonField>
    </FormContainer>
  );
}
