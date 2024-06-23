"use client";
import ThreadsInterface from "@/interfaces/threadsInterface";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export default function ThreadCards({
  params,
  thread,
}: {
  params: { boards: string };
  thread: ThreadsInterface;
}) {
  return (
    <Link href={`${params.boards}/thread/${thread.postNumber}`}>
      <Card shadow="sm" isHoverable>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={thread.title}
            className="w-full object-contain min-h-[150px] max-h-[250px]"
            src={thread.imageUrl}
          />
          <div className="flex flex-col justify-center p-3 items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">
                {`${thread.totalReplies} / ${thread.totalFiles} / ${thread.totalUniqueIps}`}
              </p>
              <h3 className="text-xl font-bold text-default-900">
                {thread.title}
              </h3>
            </div>

            <div className="flex justify-center">
              <p className="text-default-900 text-sm text-center">
                {thread.content.length > 100
                  ? thread.content.slice(0, 100) + "...."
                  : thread.content}
              </p>
            </div>
          </div>
        </CardBody>

        {/* <CardFooter className="text-small justify-between">
        <b>Thread Title</b>
        <p className="text-default-500">{item.price}</p>
      </CardFooter> */}
      </Card>
    </Link>
  );
}
