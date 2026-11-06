import type {FC, PropsWithChildren} from "hono/jsx";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Main} from "./Main";

type LayoutProps = PropsWithChildren;

export const Layout: FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AgentClinic</title>
      <link rel="stylesheet" href="/static/style.css" />
    </head>
    <body>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </body>
  </html>
);
