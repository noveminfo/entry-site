import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const BaseButton = styled.button`
  ${tw`
    px-4
    py-2
    rounded-lg
    outline-none
    text-white
    text-base
    text-center
    border-2
    border-solid
    border-gray-800
    focus:outline-none
    bg-blue-600
    hover:bg-blue-500
  `}
`;

interface Props {
  className: string;
  onClick: () => void;
  text: string;
}

export default function Button({
  className,
  text,
  onClick,
}: Props): ReactElement {
  return (
    <BaseButton className={className} onClick={onClick}>
      {text}
    </BaseButton>
  );
}
