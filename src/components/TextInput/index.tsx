import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const BaseInput = styled.input`
  ${tw`
    px-2
    border-2
    border-solid
    border-blue-600
    text-black
    bg-white
    focus:outline-none
  `}
`;

interface Props {
  className: string;
  [key: string]: any;
}

export const TextInput = React.forwardRef(
  (
    { className, ...rest }: Props,
    ref: React.Ref<HTMLInputElement>
  ): ReactElement => <BaseInput ref={ref} className={className} {...rest} />
);

TextInput.displayName = "TextInput";
