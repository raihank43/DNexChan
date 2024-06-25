"use client";
import ThreadsInterface from "@/interfaces/threadsInterface";
import GreentextFormatter from "@/utils/greentextFormatter";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dateFormatter from "@/utils/dateFormatter";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

// CSS untuk greentext

export default function ThreadCards({
  params,
  thread,
}: {
  params: { boards: string };
  thread: ThreadsInterface;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`${params.boards}/thread/${thread.postNumber}`}
            className="transition-all ease-in-out duration-500 hover:z-40 h-96 overflow-y-scroll hover:scale-105 scrollbar-hide rounded-lg rounded-t-xl hover:shadow-sm hover:bg-orange-200 hover:p-3"
          >
            <Card
              shadow="none"
              // isHoverable
              className="h-full bg-transparent"
            >
              {thread.isPinned && (
                <DrawingPinFilledIcon className="absolute text-blue-500 top-2 right-2 z-50 w-10 h-10" />
              )}

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
                    <h3 className="text-xl font-bold text-red-700 text-center">
                      {thread.title}
                    </h3>
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
        </TooltipTrigger>

        <TooltipContent className="border-none bg-slate-700 flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-red-500 font-semibold">{thread.name}</p>
            <a
              href={thread.imageUrl}
              className="text-red-500 underline text-xs"
            >
              {thread.fileName?.length > 20
                ? thread.fileName.substring(0, 20) + "..."
                : thread.fileName}
            </a>
            <p className="text-red-500 text-xs">({thread.fileRes})</p>
          </div>

          <div>
            <p className="text-gray-300">{dateFormatter(thread.createdAt)}</p>
          </div>
          <div className="flex justify-center gap-2">
            <p className="text-gray-300 font-bold">
              Replies: {thread.totalReplies}
            </p>
            <p className="text-gray-300 font-bold">
              Files: {thread.totalFiles}
            </p>
            <p className="text-gray-300 font-bold">
              Posters: {thread.totalUniqueIps}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
