// Input.tsx
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Header />
      <div id="page-content-wrapper">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
