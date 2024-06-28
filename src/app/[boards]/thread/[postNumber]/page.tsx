import type { Metadata } from "next";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
import ThreadsInterface from "@/interfaces/threadsInterface";
import ThreadRepliesComponents from "@/components/ThreadRepliesComponents";

async function getBoard({ params }: { params: { boards: string } }) {
  "use server";
  const board = await fetch(baseUrl + `/api/boards/${params.boards}`);
  if (!board.ok) {
    throw new Error("Something went wrong!");
  }
  const { data } = await board.json();
  return data as BoardsInterface;
}

async function getThread({
  params,
}: {
  params: { boards: string; postNumber: String };
}) {
  "use server";
  const threads = await fetch(
    baseUrl + `/api/thread/${params.boards}/${params.postNumber}`,
    {
      cache: "no-cache",
    }
  );
  if (!threads.ok) {
    throw new Error("Something went wrong!");
  }
  const { data } = await threads.json();
  return data as ThreadsInterface;
}

export async function generateMetadata({
  params,
}: {
  params: { postNumber: string; boards: string };
}): Promise<Metadata> {
  const thread = await getThread({ params });
  const truncatedContent =
    thread.content.length > 100
      ? thread.content.slice(0, 100) + "..."
      : thread.content;
  return {
    title: `/${params.boards}/ - ${
      thread.title ? thread.title : truncatedContent
    } - IndoChan`,
    description: truncatedContent,
    icons: "/favicon.ico",
  };
}

export default async function Thread({
  params,
}: {
  params: { postNumber: string; boards: string };
}) {
  const board = await getBoard({ params });
  const thread = await getThread({ params });
  return (
    <main className="flex flex-col min-h-[150vh] gap-2 transition-all ease-in-out duration-500">
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

      <ThreadRepliesComponents params={params} thread={thread} />
    </main>
  );
}
