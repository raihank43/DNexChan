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

export default function ThreadComponent({ getBoard }: { getBoard: any }) {
  const handleUpdate = async () => {
    console.log("Update");
    await getBoard({ params: { boards: "a" } });
  };
  return (
    <>
      <section className="flex justify-center flex-col items-center p-5">
        <Button className="bg-red-900 font-semibold">Buat Utas Baru</Button>
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

      <section className="flex justify-center flex-col items-center p-5 ">
        <div className="min-h-screen w-full bg-orange-300">
          <h1>Thread Component</h1>
        </div>
      </section>
    </>
  );
}
