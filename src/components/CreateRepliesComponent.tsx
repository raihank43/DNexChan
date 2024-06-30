"use client";
import Draggable from "react-draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import ThreadsInterface from "@/interfaces/threadsInterface";
import ThreadRepliesInterface from "@/interfaces/threadRepliesInterface";

export default function CreateRepliesComponent({
  setShowWindow,
  thread,
  threadReplies,
}: {
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  thread: ThreadsInterface;
  threadReplies: ThreadRepliesInterface[];
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const data = fetch(baseUrl + `/api/threadReplies/${thread._id}`, {
      cache: "no-store",
      method: "POST",
      body: formData,
    })
      .then(async (res: any) => {
        const response = await res.json();
        if (response.status === 400) {
          console.log("error", response.message);
          toast({
            title: "Uh oh! Something went wrong.",
            description: response.message,
            variant: "destructive",
            className: "p-4",
          });
          setLoading(false);
        }

        if (response.status === 200) {
          toast({
            title: "Success!",
            description: "Reply created successfully.",
            variant: "default",
            className: "p-4 bg-green-500 text-white",
          });
          setLoading(false);
          threadReplies.push(response.data);
          setShowWindow(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Internal Server Error",
          variant: "destructive",
          className: "p-4",
        });
        setLoading(false);
      });
  };

  return (
    <Draggable handle=".drag-handle">
      <div
        className="bg-orange-200 shadow-lg rounded-md border-2 border-red-900 fixed top-1/4 left-1/3 z-50 w-[500px]"
        style={{ top: "25%", left: "25%", transform: "translate(-50%, -50%)" }} // Menyesuaikan posisi ke tengah
      >
        <div className="drag-handle flex items-center justify-between gap-5 bg-red-900">
          <h1 className="text-orange-300 font-bold pl-5">
            Membalas Utas No.{thread.postNumber}
          </h1>

          <Button
            className="bg-red-900 font-semibold hover:bg-red-900 hover:text-red-700"
            onClick={() => setShowWindow(false)}
          >
            X
          </Button>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-2 p-5">
          <div className="flex justify-between gap-2">
            <Input type="text" placeholder="Nama" name="name" />
            <Input type="text" placeholder="Opsi" name="email" />
          </div>

          <Textarea placeholder="Komen" name="content" />
          <Input id="file" type="file" name="file" />
          {loading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Memposting...
            </Button>
          ) : (
            <Button className="bg-red-900 font-semibold">Submit</Button>
          )}
        </form>
      </div>
    </Draggable>
  );
}
