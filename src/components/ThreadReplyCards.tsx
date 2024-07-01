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
import ThreadRepliesInterface from "@/interfaces/threadRepliesInterface";
import { RepliesQuotationHover } from "./RepliesQuotationHover";

export default function ThreadReplyCards({
  reply,
  onSelectPost,
  isSelected,
  threadReplies,
}: {
  reply: ThreadRepliesInterface;
  onSelectPost: (postNumber: Number) => void;
  isSelected: boolean;
  threadReplies: ThreadRepliesInterface[];
}) {
  const [expandedImage, setExpandedImage] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(false);

  const handleClick = (postNumberTarget: Number) => {
    onSelectPost(postNumberTarget);
  };

  return (
    <div
      id={`${reply.postNumber}`}
      className={`flex flex-col items-center sm:flex-col md:items-stretch bg-orange-100 min-w-[100px] max-w-fit pt-0 rounded-lg shadow-md ${
        isSelected ? "bg-orange-200 ease-out duration-500" : ""
      }`}
    >
      <div
        className={`flex w-full md:flex-row items-center gap-2  flex-wrap bg-orange-200 p-2 rounded-t-lg border-t-2 border-x-2 border-orange-300 ${
          isSelected ? "bg-orange-300 ease-out duration-500 " : ""
        }`}
      >
        <p className="text-green-700 text-sm font-semibold">{reply.name}</p>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-orange-700 text-sm ">
                {dateFormatter(reply.createdAt)}
              </p>
            </TooltipTrigger>
            <TooltipContent className="text-sm bg-slate-700 text-white border-none">
              {getTimeSincePosted(reply.createdAt)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="text-orange-900 text-sm font-semibold">
          {`No. ${reply.postNumber}`}
        </p>

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

        {reply.listReplies?.map((eachPostNumberReply) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`#${eachPostNumberReply}`}
                  onClick={() => handleClick(eachPostNumberReply)}
                  className="border-b-2  border-blue-700 text-sm font-semibold text-blue-700 hover:text-blue-500 hover:border-b-blue-500 ease-in-out duration-500"
                >{`>>${eachPostNumberReply}`}</a>
              </TooltipTrigger>
              <RepliesQuotationHover
                threadReplies={threadReplies}
                postNumberTarget={eachPostNumberReply}
              />
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div
        className={`border-2 border-t-0 rounded-lg rounded-t-none border-orange-300 w-full ${
          reply.isYourPost && `border-dashed border-l-3 border-l-red-800`
        } `}
      >
        {reply.imageUrl && (
          <div className="flex gap-2 self-stretch p-3 pb-0 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={reply.imageUrl}
                    className="text-xs underline text-center text-red-900 font-bold hover:text-red-700 ease-in-out duration-500"
                    target="_blank"
                  >
                    {reply?.fileName?.length && reply.fileName?.length > 70
                      ? `${reply.fileName.slice(0, 70)}...`
                      : reply.fileName}
                  </a>
                </TooltipTrigger>
                <TooltipContent className="text-sm bg-slate-700 text-white border-none">
                  {reply.fileName}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p className="text-red-900 text-xs">{`(${
              reply.fileSize && formatBytes(reply.fileSize)
            }, ${reply.fileRes})`}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-2 p-3">
          {reply.imageUrl && (
            <div className="flex gap-2 flex-col relative">
              <Image
                radius="md"
                src={reply.imageUrl}
                width="100%"
                alt={reply.fileName}
                className={`object-contain min-h-[100px] transition-all ease-in-out duration-500 ${
                  expandedImage ? `` : `max-h-[150px] `
                } cursor-pointer`}
                onClick={() => setExpandedImage(!expandedImage)}
              />
            </div>
          )}

          <div className="flex flex-col w-full p-3 pt-2">
            <p className="text-sm whitespace-pre-line">
              {GreentextFormatter({ text: reply.content })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
