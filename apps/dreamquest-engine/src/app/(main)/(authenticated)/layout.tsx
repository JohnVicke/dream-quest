import { ReactQueryProvider } from "./react-query-provider";

export default function AuthenticatedLayout({
  children,
}: React.PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
