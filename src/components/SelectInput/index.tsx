import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const BaseSelect = styled.select`
  ${tw`
    border-2
    border-solid
    border-blue-600
    text-black
    bg-white
    focus:outline-none
  `}
`;

interface DataItem {
  name: string;
}

interface Props {
  className: string;
  data: DataItem[];
  [key: string]: any;
}

export const SelectInput = React.forwardRef(
  (
    { className, data, ...rest }: Props,
    ref: React.Ref<HTMLSelectElement>
  ): ReactElement => (
    <BaseSelect ref={ref} className={className} {...rest}>
      <option value="0">選択してください</option>
      {data?.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </BaseSelect>
  )
);

SelectInput.displayName = "SelectInput";
