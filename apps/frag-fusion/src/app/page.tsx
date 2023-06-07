import Link from "next/link";
import { Button } from "@ff/ui";

export default function Page() {
  return (
    <>
      <Button variant="outline">hello world</Button>
      <Link href="/home">Platform</Link>
    </>
  );
}
