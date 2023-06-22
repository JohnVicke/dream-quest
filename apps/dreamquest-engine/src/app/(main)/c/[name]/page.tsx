export default async function Page({ params }: { params: { name: string } }) {
  return (
    <div>
      <h1>c/{params.name}</h1>
    </div>
  );
}
