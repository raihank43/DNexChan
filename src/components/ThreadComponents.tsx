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
import { DraggableWindow } from "./DraggableComponent";
import { useState } from "react";
import ThreadCards from "./ThreadCards";

export default function ThreadComponent({ getBoard }: { getBoard: any }) {
  const [showWindow, setShowWindow] = useState(false);

  const handleCreateThreadButton = () => {
    showWindow ? setShowWindow(false) : setShowWindow(true);
  };
  const handleUpdate = async () => {
    console.log("Update");
    await getBoard({ params: { boards: "a" } });
  };
  return (
    <>
      {showWindow && <DraggableWindow />}
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
      <section className="flex justify-center flex-wrap gap-10 items-center p-5 ">
        <ThreadCards />
        <ThreadCards />
        <ThreadCards />
        <ThreadCards />
        <ThreadCards />
      </section>
    </>
  );
}
