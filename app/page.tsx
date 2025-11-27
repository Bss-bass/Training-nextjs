import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <>
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Link href="/todos" className="p-2 bg-blue-500 text-white rounded">Go to Todos</Link>
      <br />
      <Link href="/quiz" className="p-2 bg-green-500 text-white rounded">Go to Quiz</Link>
      <br />
      <Link href="/kmitl" className="p-2 bg-red-500 text-white rounded">Go to KMITL</Link>
      <br />
      <Link href="/pokedex" className="p-2 bg-yellow-500 text-white rounded">Go to Pokedex</Link>
      <br />
      <Image src="/file.svg" alt="Description" width={50} height={50} />
    </div>
    </>
  );
}
