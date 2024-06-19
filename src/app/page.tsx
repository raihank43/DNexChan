import { Button } from "@/components/ui/button";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getIp() {
  const response = await fetch(baseUrl + "/api/getIp");
  const data = await response.json();
  return data;
}

export default async function Home() {
  const ipAddress = await getIp();
  console.log(ipAddress);

  return (
    <main className="flex flex-col px-20  min-h-screen">
      <div className="flex justify-center">
        <h1 className="flex items-center text-6xl font-bold p-10 text-red-900">
          <img src="/indochan-logo.png" className="h-32"></img>
          Indochan
        </h1>
      </div>

      <div className="border-solid border-red-700 border-2 mb-2 bg-white">
        <h1 className="bg-red-900 font-bold text-white">What is IndoChan?</h1>
        <p className="text-sm">
          IndoChan is an Indonesian modern imageboard built using Nextjs. It is
          a work in progress and is not yet ready for production.
        </p>
        <Button>Click me</Button>
        <div className="mt-2">
          <h1 className="bg-red-900 font-bold text-white">Your IP Address</h1>
          <p className="text-sm">Your ip is {ipAddress.ip}</p>
        </div>
      </div>
      <div className="border-solid border-red-700 border-2 bg-white mb-2">
        <h1 className="bg-orange-300 font-bold text-red-900">Boards</h1>
        <div className="bg-slate-200 flex">
          <div className=""></div>
          <Link href={"/random"} className="font-bold">
            Random
          </Link>
        </div>
      </div>

      <div className="border-solid border-red-700 border-2 bg-white">
        <h1 className="bg-orange-300 font-bold text-red-900">
          Popular Threads
        </h1>
        <div className="bg-white flex">
          <div className=""></div>
          <p>Random</p>
        </div>
      </div>
    </main>
  );
}
