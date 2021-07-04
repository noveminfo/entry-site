import React, { ReactElement } from "react";

import Layout from "../../components/Layout";
import LoginForm from "./LoginForm";

export default function LoginPage(): ReactElement {
  return (
    <Layout title={"ログイン"}>
      <LoginForm />
    </Layout>
  );
}
