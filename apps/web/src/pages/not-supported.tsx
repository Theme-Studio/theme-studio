import { Heading } from "@theme-studio/ui";
import Link from "next/link";

export default function NotSupportedPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-green-700">
        <Heading className="">Your device was not supported</Heading>
        <p>
          We are sorry your device wasn&apos;t supported. Please try again on
          your computer.
        </p>
        <Link href="/" passHref>
          <a className="">Go Back</a>
        </Link>
      </div>
    </div>
  );
}
