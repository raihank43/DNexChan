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

export default function ThreadComponent({
  getBoard,
  params,
}: {
  getBoard: any;
  params: { boards: string };
}) {
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
      {showWindow && <CreateThreadComponent setShowWindow={setShowWindow} />}
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
        <ThreadCards
          params={params}
          imageUrl="https://i.pinimg.com/736x/88/53/1c/88531c7511bccb1f899a8b330a05fb43--pokemon-games-penguin.jpg"
        />
        <ThreadCards
          params={params}
          imageUrl="https://th.bing.com/th/id/OIP.qRM75FBA4wQGA2p41Hm9NgHaLM?rs=1&pid=ImgDetMain"
        />
        <ThreadCards
          params={params}
          imageUrl="https://pngimg.com/uploads/pokemon/pokemon_PNG154.png"
        />
        <ThreadCards
          params={params}
          imageUrl="https://th.bing.com/th/id/OIP.vg1KOuYtiZI2V0_ZXB-05gAAAA?rs=1&pid=ImgDetMain"
        />
        <ThreadCards
          params={params}
          imageUrl="https://th.bing.com/th/id/OIP.voLFhNKVfu3mMWUeEgKgEgHaHa?rs=1&pid=ImgDetMain"
        />
        <ThreadCards
          params={params}
          imageUrl="https://th.bing.com/th/id/OIP.voLFhNKVfu3mMWUeEgKgEgHaHa?rs=1&pid=ImgDetMain"
        />
        <ThreadCards
          params={params}
          imageUrl="https://wallpapercave.com/wp/wp2564007.jpg"
        />
      </section>
    </>
  );
}
