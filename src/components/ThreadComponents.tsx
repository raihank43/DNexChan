"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateThreadComponent } from "./CreateThreadComponent";
import { useState } from "react";
import ThreadCards from "./ThreadCards";
import ThreadsInterface from "@/interfaces/threadsInterface";

export default function ThreadComponent({
  getBoard,
  params,
  threads,
  getThreads,
}: {
  getBoard: any;
  getThreads: any;
  params: { boards: string };
  threads: ThreadsInterface[];
}) {
  const [showWindow, setShowWindow] = useState(false);
  const [threadData, setThreadData] = useState<ThreadsInterface[]>(threads);

  const handleCreateThreadButton = () => {
    showWindow ? setShowWindow(false) : setShowWindow(true);
  };
  const handleUpdate = async () => {
    const threads = (await getThreads({ params })) as ThreadsInterface[];
    setThreadData(threads);
  };

  console.log({ threadData });
  return (
    <>
      {showWindow && (
        <CreateThreadComponent
          setShowWindow={setShowWindow}
          params={params}
          setThreadData={setThreadData}
        />
      )}
      <section className="flex justify-center flex-col items-center p-5">
        <Button
          onClick={handleCreateThreadButton}
          className="bg-red-900 font-semibold"
        >
          Buat Utas Baru
        </Button>
      </section>
      <section className="flex gap-2 justify-evenly px-10">
        <Link
          href={"/"}
          className="bg-orange-300 font-semibold text-red-900 hover:bg-red-900 hover:text-orange-300 flex rounded-md p-2 text-sm items-center ease-out duration-300"
        >
          Beranda
        </Link>
        <Button
          onClick={handleUpdate}
          className="bg-orange-300 font-semibold text-red-900 hover:bg-red-900 hover:text-orange-300"
        >
          Perbarui Katalog
        </Button>
        <Input type="text" placeholder="Search" />
        <div className="self-end">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="gap-4 grid grid-cols-2 sm:grid-cols-2 items-center p-5 px-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {threadData.map((thread) => (
          <ThreadCards
            key={String(thread._id)}
            thread={thread}
            params={params}
          />
        ))}
      </section>
    </>
  );
}
