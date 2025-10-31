import { PropsWithChildren } from "react";
import Header from "../header/header";
import "./layout.style.scss";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
}
