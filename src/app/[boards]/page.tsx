import type { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
import ThreadComponent from "@/components/ThreadComponents";

async function getBoard({ params }: { params: { boards: string } }) {
  "use server";
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
      <div className="px-10 mt-5">
        <section className="flex justify-center flex-col items-center p-5 bg-orange-300 rounded-2xl shadow-sm  ">
          <h1 className="flex items-center text-4xl font-bold text-red-900">
            <img src="/indochan-logo.png" className="h-24"></img>
            Indochan
          </h1>
          <h1 className="flex items-center text-2xl font-bold text-red-900">
            {`/${params.boards}/`} - {`${board.name}`}
          </h1>
        </section>
      </div>

      <ThreadComponent getBoard={getBoard} params={params} />
    </main>
  );
}
