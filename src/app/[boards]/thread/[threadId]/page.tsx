import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { threadId: string; boards: string };
}): Promise<Metadata> {
  return {
    title: `/${params.boards}/ - Thread Title -  - IndoChan`,
    description: "Thread page",
  };
}

export default function Thread({ params }: { params: { threadId: string } }) {
  return (
    <div>
      <h1>Thread {params.threadId}</h1>
    </div>
  );
}
