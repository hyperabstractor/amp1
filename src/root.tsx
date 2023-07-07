// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { InterfaceIcons } from 'ui/InterfaceIcons'
import { Toaster } from 'solid-toast';
import { HttpHeader } from 'solid-start/server'

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Studio Server</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <HttpHeader name="Access-Control-Allow-Origin" value="*" /> */}
        {/* <Link rel='stylesheet' href='http://localhost:8300/output.css' /> */}
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Toaster />
        {/* <InterfaceIcons /> */}
        <Scripts />
      </Body>
    </Html>
  );
}
