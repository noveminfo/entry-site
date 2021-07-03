import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Title = styled.h1`
  ${tw`
    py-20
    text-4xl
    font-extrabold
    text-gray-900
  `}
`;

interface Props {
  text: string;
}

export default function PageTitle({ text }: Props): ReactElement {
  return <Title>{text}</Title>;
}
