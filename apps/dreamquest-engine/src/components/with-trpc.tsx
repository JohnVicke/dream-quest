import { ReactQueryProvider } from "~/providers/react-query-provider";

export function withTrpc<TProps extends object>(
  Component: React.ComponentType<TProps>,
) {
  return (props: TProps) => {
    return (
      <ReactQueryProvider>
        <Component {...props} />
      </ReactQueryProvider>
    );
  };
}
