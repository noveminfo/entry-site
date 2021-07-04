import React, { ReactElement } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import PageTitle from "../../components/PageTitle";

const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    px-8
    items-center
    bg-white
    overflow-hidden
  `}
`;

interface Props {
  title: string;
  children: ReactElement;
}

export default function Layout({ title, children }: Props): ReactElement {
  return (
    <PageContainer>
      <PageTitle text={title} />
      {children}
    </PageContainer>
  );
}
