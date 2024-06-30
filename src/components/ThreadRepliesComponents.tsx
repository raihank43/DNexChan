"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThreadsInterface from "@/interfaces/threadsInterface";
import ThreadOPCards from "./ThreadOPCards";
import ThreadReplyCards from "./ThreadReplyCards";
import ThreadRepliesInterface from "@/interfaces/threadRepliesInterface";
import { useEffect, useState } from "react";
import CreateRepliesComponent from "./CreateRepliesComponent";

export default function ThreadRepliesComponents({
  params,
  thread,
  threadReplies,
}: {
  params: { boards: string };
  thread: ThreadsInterface;
  threadReplies: ThreadRepliesInterface[];
}) {
  const [showWindow, setShowWindow] = useState(false);
  const handleCreateRepliesButton = () => {
    showWindow ? setShowWindow(false) : setShowWindow(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "q") {
        setShowWindow(true);
      } else if (event.key === "Escape") {
        setShowWindow(false);
      }
    };

    // Menambahkan event listener ketika komponen dimuat
    window.addEventListener("keydown", handleKeyDown);

    // Menghapus event listener ketika komponen akan di-unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowWindow]); // Pastikan useEffect ini dijalankan lagi hanya jika setShowWindow berubah

  return (
    <>
      {showWindow && (
        <CreateRepliesComponent
          threadReplies={threadReplies}
          setShowWindow={setShowWindow}
          thread={thread}
        />
      )}
      <section className="flex justify-center flex-col items-center p-5">
        <Button
          className="bg-red-900 font-semibold"
          onClick={handleCreateRepliesButton}
        >
          Balas Utas
        </Button>
      </section>

      <section className="flex gap-2  mx-10 py-3 border-y-2  border-orange-300 ">
        <Link
          href={`/${params.boards}/katalog`}
          className="bg-orange-300 font-semibold text-red-900 hover:bg-red-900 hover:text-orange-300 flex rounded-md p-2 text-sm items-center ease-out duration-300"
        >
          Katalog
        </Link>

        <Button className="bg-orange-300 font-semibold text-red-900 hover:bg-red-900 hover:text-orange-300 flex rounded-md p-2 text-sm items-center ease-out duration-300">
          Perbarui Utas
        </Button>

        <Button className="bg-orange-300 font-semibold text-red-900 hover:bg-red-900 hover:text-orange-300 flex rounded-md p-2 text-sm items-center ease-out duration-300">
          Kebawah
        </Button>

        <Button className="bg-orange-300 font-semibold text-red-900 hover:bg-red-900 hover:text-orange-300 flex rounded-md p-2 text-sm items-center ease-out duration-300">
          Keatas
        </Button>
      </section>

      <section className="flex flex-col gap-3 p-5 px-10 transition-all ease-in-out h-full duration-500">
        <ThreadOPCards thread={thread} />
        {threadReplies.map((reply) => (
          <ThreadReplyCards key={String(reply._id)} reply={reply} />
        ))}
      </section>
    </>
  );
}
