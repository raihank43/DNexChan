"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThreadsInterface from "@/interfaces/threadsInterface";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "./ui/use-toast";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
import DeleteThreadAlert from "./DeleteThreadAlert";

export default function DropdownMenuThread({
  thread_Id,
  threadData,
  setThreadData,
}: {
  thread_Id: string;
  threadData: ThreadsInterface[];
  setThreadData: React.Dispatch<React.SetStateAction<ThreadsInterface[]>>;
}) {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleDropDownMenuClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    // Ini akan mencegah event klik menyebar ke elemen di atasnya, seperti Link
    event.stopPropagation();
  };

  const handleDeleteThread = async (threadId: string) => {
    setLoading(true);
    const response = await fetch(baseUrl + "/api/threads/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ threadId, password }),
    });

    const data = await response.json();
    if (data.status === 401) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: data.message,
        variant: "destructive",
        className: "p-4",
      });
      setLoading(false);
    }

    // delete threadData from state
    if (data.status === 200) {
      const newThreadData = threadData.filter(
        (thread) => String(thread._id) !== threadId
      );
      setThreadData(newThreadData);
      toast({
        title: "Success!",
        description: "Thread deleted successfully.",
        variant: "default",
        className: "p-4 bg-green-500 text-white",
      });
      setLoading(false);
    }
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
          <DeleteThreadAlert
            setPassword={setPassword}
            handleDeleteThread={handleDeleteThread}
            thread_Id={String(thread_Id)}
            loading={loading}
          />

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
