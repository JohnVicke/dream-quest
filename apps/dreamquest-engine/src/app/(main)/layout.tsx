import MainLayout from "~/modules/layout/main-layout";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <MainLayout>
      <div className="pt-16">{children}</div>
    </MainLayout>
  );
}
