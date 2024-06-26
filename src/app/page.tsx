import ThreadCards from "@/components/ThreadCards";
import { Image } from "@nextui-org/image";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
import type { Metadata } from "next";

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

async function getStats() {
  const response = await fetch(baseUrl + "/api/boards/stats", {
    cache: "no-store",
  });
  const data = (await response.json()) as StatsInterface;
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return data;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "IndoChan",
    description: "A simple and modern Indonesian image-based bulletin board",
    icons: "/favicon.ico",
  };
}

export default async function Home() {
  const ipAddress = await getIp();
  const boards = await getBoards();
  const stats = await getStats();

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
          IndoChan is a simple yet modern image-based bulletin board that takes
          its inspiration from the infamous 4chan, where anyone can post
          comments and share images. There are boards dedicated to a variety of
          topics, ranging from Japanese animation and culture to videogames,
          music, and politics. Users do not need to register an account before
          participating in the community. Feel free to click on a board below
          that interests you and jump right in!
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
                href={`${board.initial}katalog`}
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
        <div className="gap-4 grid grid-cols-2 p-6 bg-white rounded-md">
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
        <div className="bg-white flex p-6 justify-between rounded-md">
          <div className="flex gap-2">
            <p className="font-bold text-red-900">Total Posts:</p>
            <p className="font-semibold text-orange-600">{stats.totalPosts}</p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold text-red-900">Unique Users:</p>
            <p className="font-semibold text-orange-600">{stats.users}</p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold text-red-900">Active Content:</p>
            <p className="font-semibold text-orange-600">
              {stats.activeContent}
            </p>
          </div>
        </div>
      </section>

      <footer className="flex justify-center bg-red-900 text-white p-2 my-5 rounded-lg shadow-lg">
        <p>
          Copyright © IndoChan 2024 - {new Date().getFullYear()} All Rights
          Reserved.
        </p>
      </footer>
    </main>
  );
}
