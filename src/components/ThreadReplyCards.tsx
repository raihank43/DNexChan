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

export default function ThreadReplyCards() {
  const [expandedImage, setExpandedImage] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(false);
  return (
    <div className="flex flex-col items-center sm:flex-col md:items-stretch bg-orange-100 min-w-[100px] max-w-fit pt-0 rounded-lg shadow-md ">
      <div className="flex w-full md:flex-row items-center gap-2  flex-wrap bg-orange-200 p-2 rounded-t-lg border-2 border-orange-300">
        <p className="text-green-700 text-sm font-semibold">{"Awanama"}</p>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-orange-700 text-sm ">
                {"06/29/24 (Sabtu) 15:32:56"}
              </p>
            </TooltipTrigger>
            <TooltipContent className="text-sm bg-slate-700 text-white border-none">
              {"2021-10-10T00:00:00.000Z"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="text-orange-900 text-sm font-semibold">{`No. ${"2"}`}</p>

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

      <div className="border-2 border-t-0 rounded-lg rounded-t-none border-orange-300 w-full ">
        <div className="flex gap-2 self-stretch p-3 pb-0 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={
                    "https://res.cloudinary.com/dnt95jnye/image/upload/v1719647640/indochan/b/49/giuulb6svksnwswqqxik.jpg"
                  }
                  className="text-xs underline text-center text-red-900 font-bold hover:text-red-700 ease-in-out duration-500"
                  target="_blank"
                >
                  02302490950.jpg
                </a>
              </TooltipTrigger>
              <TooltipContent className="text-sm bg-slate-700 text-white border-none">
                {"02302490950.jpg"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <p className="text-red-900 text-xs">{`("136.84 KB", ${"800x787"})`}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 p-3">
          <div className="flex gap-2 flex-col relative">
            <Image
              radius="md"
              src={
                "https://res.cloudinary.com/dnt95jnye/image/upload/v1719647640/indochan/b/49/giuulb6svksnwswqqxik.jpg"
              }
              width="100%"
              alt={"thread.fileName"}
              className={`object-contain min-h-[100px] transition-all ease-in-out duration-500 ${
                expandedImage ? `` : `max-h-[150px] `
              } cursor-pointer`}
              onClick={() => setExpandedImage(!expandedImage)}
            />
          </div>

          <div className="flex flex-col w-full p-3 pt-0">
            <p className="text-sm whitespace-pre-line">
              {GreentextFormatter({ text: "Lorem ipsum content" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
