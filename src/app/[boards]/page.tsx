import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
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
async function getBoard({ params }: { params: { boards: string } }) {
  const board = await fetch(baseUrl + `/api/boards/${params.boards}`);
  if (!board.ok) {
    throw new Error("Something went wrong!");
  }
  const { data } = await board.json();
  return data as BoardsInterface;
}

export async function generateMetadata({
  params,
}: {
  params: { boards: string };
}): Promise<Metadata> {
  const board = await getBoard({ params });
  return {
    title: `/${params.boards}/ - ${board.name} - IndoChan`,
    description: "A simple and modern Indonesian image-based bulletin board",
  };
}

export default async function Boards({
  params,
}: {
  params: { boards: string };
}) {
  const board = await getBoard({ params });
  return (
    <main className="flex flex-col min-h-screen gap-2">
      <section className="flex justify-center flex-col items-center">
        <h1 className="flex items-center text-4xl font-bold text-red-900">
          <img src="/indochan-logo.png" className="h-24"></img>
          Indochan
        </h1>
        <h1 className="flex items-center text-2xl font-bold text-red-900">
          {`/${params.boards}/`} - {`${board.name}`}
        </h1>
      </section>

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
        <Button className="bg-orange-300 font-semibold text-red-900 hover:bg-red-900 hover:text-orange-300">
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
    </main>
  );
}
