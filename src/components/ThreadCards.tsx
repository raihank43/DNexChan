"use client";
import ThreadsInterface from "@/interfaces/threadsInterface";
import GreentextFormatter from "@/utils/greentextFormatter";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

// CSS untuk greentext

export default function ThreadCards({
  params,
  thread,
}: {
  params: { boards: string };
  thread: ThreadsInterface;
}) {
  return (
    <Link
      href={`${params.boards}/thread/${thread.postNumber}`}
      className="transition-all ease-in-out duration-500 hover:z-40 h-96 overflow-y-scroll hover:scale-105 scrollbar-hide rounded-lg rounded-t-xl hover:shadow-sm hover:bg-orange-200 hover:p-3"
    >
      <Card
        shadow="none"
        // isHoverable
        className="h-full bg-transparent"
      >
        <CardBody className="overflow-auto p-0 scrollbar-hide">
          <Image
            // shadow="sm"
            radius="lg"
            width="100%"
            alt={thread.title}
            className="w-full object-contain min-h-[150px] max-h-[250px]"
            src={thread.imageUrl}
          />
          <div className="flex flex-col justify-center p-3 items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font-bold">
                {`${thread.totalReplies} / ${thread.totalFiles} / ${thread.totalUniqueIps}`}
              </p>
              <h3 className="text-xl font-bold text-red-700 text-center">{thread.title}</h3>
            </div>

            <div className="flex justify-center">
              <p className="text-default-900 text-sm text-center whitespace-pre-line">
                {GreentextFormatter({
                  text: thread.content,
                })}
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
