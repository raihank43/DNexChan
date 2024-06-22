import ThreadCards from "@/components/ThreadCards";
import { Image } from "@nextui-org/image";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

async function getIp() {
  const response = await fetch(baseUrl + "/api/getIp");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data;
}

async function getBoards() {
  const response = await fetch(baseUrl + "/api/boards");
  const data = (await response.json()) as BoardsInterface[];
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data;
}

export default async function Home() {
  const ipAddress = await getIp();
  const boards = await getBoards();

  return (
    <main className="flex flex-col lg:px-60 md:px-60 sm:px-32 min-h-screen gap-2">
      <section className="flex justify-center">
        <h1 className="flex items-center text-6xl font-bold p-10 text-red-900">
          <img src="/indochan-logo.png" className="h-32"></img>
          Indochan
        </h1>
      </section>

      <section className="border-solid border-red-700 border-2 bg-white shadow-lg rounded-md">
        <h1 className="bg-red-900 font-bold text-white pl-2">
          What is IndoChan?
        </h1>
        <p className="text-sm p-5">
          IndoChan is a simple and modern image-based bulletin board based on
          the infamous 4chan where anyone can post comments and share images.
          There are boards dedicated to a variety of topics, from Japanese
          animation and culture to videogames, music, and photography. Users do
          not need to register an account before participating in the community.
          Feel free to click on a board below that interests you and jump right
          in!
        </p>
        {/* <Button>Click me</Button> */}
        <div className="mt-2">
          <h1 className="bg-red-900 font-bold text-white">Your IP Address</h1>
          <p className="text-sm">Your ip is {ipAddress.ip}</p>
        </div>
      </section>

      <section className="border-solid border-red-700 border-2 bg-white shadow-lg rounded-md">
        <h1 className="bg-orange-300 font-bold text-red-900 pl-2 rounded-t-sm">
          Boards
        </h1>
        <div className="flex p-4 justify-evenly flex-wrap">
          {boards.map((board) => {
            return (
              <Link
                href={board.initial}
                key={board._id}
                className="text-red-900 font-semibold mb-2 border-b-2 border-red-900 hover:text-red-500 hover:border-red-500 ease-in-out duration-500"
              >
                {board.name}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-solid border-red-700 border-2 bg-white rounded-md shadow-lg">
        <h1 className="bg-orange-300 font-bold text-red-900 pl-2 rounded-t-sm">
          Post Terbaru
        </h1>
        <div className="bg-white gap-4 grid grid-cols-2 p-6">
          <Image
            alt="Random"
            src="https://wallpapercave.com/wp/wp2564007.jpg"
            width={300}
            height={300}
          />
        </div>
      </section>

      <section className="border-solid border-red-700 border-2 bg-white rounded-md shadow-lg">
        <h1 className="bg-orange-300 font-bold text-red-900 pl-2 rounded-t-sm">
          Utas Populer
        </h1>
        <div className="gap-4 grid grid-cols-2 p-6">
          {/* <ThreadCards imageUrl="https://wallpapercave.com/wp/wp2564007.jpg" />
          <ThreadCards imageUrl="https://wallpapercave.com/wp/wp2564007.jpg" /> */}
        </div>
      </section>

      <section className="border-solid border-red-700 border-2 bg-white rounded-md shadow-lg">
        <h1 className="bg-orange-300 font-bold text-red-900 pl-2 rounded-t-sm">
          Statistik
        </h1>
        <div className="bg-white flex">
          <div className=""></div>
          <p>Random</p>
        </div>
      </section>

      <footer className="flex justify-center bg-red-900 text-white p-2 my-5 rounded-lg shadow-lg">
        <p>Copyright © IndoChan 2024</p>
      </footer>
    </main>
  );
}
