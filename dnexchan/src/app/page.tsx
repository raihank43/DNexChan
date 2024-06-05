import { Button } from "@/components/ui/button";

export default function Home() {
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
          IndoChan is an Indonesian modern imageboard using Nextjs. It is a work
          in progress and is not yet ready for production.
        </p>
        <Button>Click me</Button>
      </div>
      <div className="border-solid border-red-700 border-2">
        <h1 className="bg-red-400 font-bold text-red-900">Boards</h1>
        <Button>Click me</Button>
      </div>
    </main>
  );
}
