"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThreadsInterface from "@/interfaces/threadsInterface";
import {
  DropdownMenuIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export default function DropdownMenuThread({
  thread_Id,
  threadData,
  setThreadData,
}: {
  thread_Id: string;
  threadData: ThreadsInterface[];
  setThreadData: React.Dispatch<React.SetStateAction<ThreadsInterface[]>>;
}) {
  const handleDropDownMenuClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    // Ini akan mencegah event klik menyebar ke elemen di atasnya, seperti Link
    event.stopPropagation();
  };

  const handleDeleteThread = async (threadId: string) => {
    const response = await fetch(baseUrl + "/api/threads/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ threadId }),
    });

    const data = (await response.json()) as { status: number; message: string };

    // delete threadData from state
    if (data.status === 200) {
      const newThreadData = threadData.filter(
        (thread) => String(thread._id) !== threadId
      );
      setThreadData(newThreadData);
    }

    return data;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DoubleArrowDownIcon className="text-orange-500 hover:text-red-950 ease-in-out duration-300" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 bg-orange-300 border-1 border-red-950 p-0"
        onClick={handleDropDownMenuClick}
      >
        <DropdownMenuLabel className="bg-red-900 font-bold text-orange-300">
          Thread Menu
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-red-900 font-semibold"
            onClick={() => handleDeleteThread(thread_Id)}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-900 font-semibold">
            Report
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-900 font-semibold">
            Pin Thread
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
