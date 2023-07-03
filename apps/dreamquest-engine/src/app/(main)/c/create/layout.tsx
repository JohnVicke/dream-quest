import { ReactQueryProvider } from "~/providers/react-query-provider";

export default function CreateLayout({ children }: React.PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
