"use client";
import ThreadsInterface from "@/interfaces/threadsInterface";
import { Image } from "@nextui-org/image";
import formatBytes from "@/utils/formatBytes";
import GreentextFormatter from "@/utils/greentextFormatter";
import dateFormatter from "@/utils/dateFormatter";
import { useState } from "react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import getTimeSincePosted from "@/utils/getTimeSincePosted";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

export default function ThreadOPCards({
  thread,
}: {
  thread: ThreadsInterface;
}) {
  const [expandedImage, setExpandedImage] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(false);
  return (
    <div className="flex gap-3 flex-col items-center sm:flex-col md:items-stretch bg-orange-100 w-full p-6 pt-4 rounded-lg shadow-md border-3 border-orange-300 ">
      <div className="flex gap-2 rounded-lg self-stretch ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={thread.imageUrl}
                className="text-xs underline text-center text-red-900 font-bold hover:text-red-700 ease-in-out duration-500"
                target="_blank"
              >
                {thread.fileName?.length > 70
                  ? `${thread.fileName.slice(0, 70)}...`
                  : thread.fileName}
              </a>
            </TooltipTrigger>
            <TooltipContent className="text-sm bg-slate-700 text-white border-none">
              {thread.fileName}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="text-red-900 text-xs">{`(${formatBytes(
          thread.fileSize
        )}, ${thread.fileRes})`}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex gap-2 flex-col relative">
          {thread.isPinned && (
            <DrawingPinFilledIcon className="absolute text-blue-500 top-2 right-2 z-50 w-10 h-10" />
          )}
          <Image
            radius="md"
            src={thread.imageUrl}
            width="100%"
            alt={thread.fileName}
            className={`object-contain min-h-[150px] ${
              expandedImage ? `` : `max-h-[350px] `
            } cursor-pointer`}
            onClick={() => setExpandedImage(!expandedImage)}
          />
        </div>

        <div className="flex flex-col w-full p-6 pt-0">
          {thread.title && (
            <p className="text-red-600 text-xl font-bold text-center md:text-start">
              {thread.title}
            </p>
          )}
          <div className="flex md:flex-row items-center gap-2  flex-wrap">
            {thread.email ? (
              <a
                href={`mailto:${thread.email}`}
                className="text-green-900 underline text-sm font-semibold hover:text-green-700"
              >
                {thread.name}
              </a>
            ) : (
              <p className="text-green-700 text-sm font-semibold">
                {thread.name}
              </p>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-orange-700 text-sm ">
                    {dateFormatter(thread.createdAt)}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="text-sm bg-slate-700 text-white border-none">
                  {getTimeSincePosted(thread.createdAt)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p className="text-orange-900 text-sm font-semibold">
              {`No. ${thread.postNumber}`}
            </p>

            {thread.isPinned && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DrawingPinFilledIcon className="text-blue-500 w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent className="text-sm bg-slate-700 text-white border-none">
                    Sticky
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Replies */}
            {expandedMenu ? (
              <TriangleDownIcon
                className="w-5 h-5 text-orange-900 ease-out duration-500 cursor-pointer hover:text-orange:700"
                onClick={() => setExpandedMenu(!expandedMenu)}
              />
            ) : (
              <TriangleRightIcon
                className="w-5 h-5 text-orange-900 ease-out duration-500 cursor-pointer hover:text-orange:700"
                onClick={() => setExpandedMenu(!expandedMenu)}
              />
            )}
            <a
              href="#"
              className="border-b-2  border-blue-700 text-sm font-semibold text-blue-700 hover:text-blue-500 hover:border-b-blue-500 ease-in-out duration-500"
            >{`>>1`}</a>
            <a
              href="#"
              className="border-b-2  border-blue-700 text-sm font-semibold text-blue-700 hover:text-blue-500 hover:border-b-blue-500 ease-in-out duration-500"
            >{`>>2`}</a>
            <a
              href="#"
              className="border-b-2  border-blue-700 text-sm font-semibold text-blue-700 hover:text-blue-500 hover:border-b-blue-500 ease-in-out duration-500"
            >{`>>3`}</a>
          </div>

          <div className="mt-5">
            <p className="text-sm whitespace-pre-line">
              {GreentextFormatter({ text: thread.content })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
