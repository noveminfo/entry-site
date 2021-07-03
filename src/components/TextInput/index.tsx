import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const BaseInput = styled.div`
  ${tw`
    w-8
    border-2
    border-solid
    border-blue-400
    text-black
    bg-white
  `}
`;

interface Props {
  className: string;
}

export default function TextInput({}: Props): ReactElement {
  return <div></div>;
}
