import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import PageTitle from "../../components/PageTitle";
import LoginForm from "./LoginForm";

const LoginContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
    bg-white
    overflow-hidden
  `}
`;

export default function LoginPage(): ReactElement {
  return (
    <LoginContainer>
      <PageTitle text={"ログイン"} />
      <LoginForm />
    </LoginContainer>
  );
}
