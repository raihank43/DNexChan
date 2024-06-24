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
export function CreateThreadComponent({
  setShowWindow,
  params,
  setThreadData,
}: {
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setThreadData: React.Dispatch<React.SetStateAction<ThreadsInterface[]>>;
  params: { boards: string };
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  console.log(loading, "loading state <<<<");
  const [tempData, setTempData] = useState(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const data = fetch(baseUrl + `/api/threads/${params.boards}`, {
      cache: "no-store",
      method: "POST",
      body: formData,
    })
      .then(async (res: any) => {
        const response = await res.json();
        console.log(response, "response");
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
            description: "Thread created successfully.",
            variant: "default",
            className: "p-4 bg-green-500 text-white",
          });
          setLoading(false);
          setTempData(response.data); // Menyimpan data ke state sementara
          console.log("lewat sini");
          // setShowWindow(false);
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

  // Kemudian, di dalam useEffect atau callback lainnya
  useEffect(() => {
    if (tempData) {
      console.log("masuk ke tempData >>>>", tempData); // Menampilkan data yang disimpan (opsional
      setThreadData((prev) => [tempData, ...prev]);
      setTempData(null); // Mengosongkan state sementara
    }
  }, [tempData]);

  console.log(tempData, "tempData <<<<");

  return (
    <Draggable handle=".drag-handle">
      <div className="bg-orange-200 shadow-lg rounded-md border-2 border-red-900 absolute top-1/4 left-1/3 z-50 w-[500px]">
        <div className="drag-handle flex items-center justify-between gap-5 bg-red-900">
          <h1 className="text-orange-300 font-bold pl-5">Buat Utas Baru</h1>

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
            <Input type="text" placeholder="Judul Utas" name="title" />
            <Input type="text" placeholder="Email" name="email" />
          </div>

          <Textarea placeholder="Content" name="content" />
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
