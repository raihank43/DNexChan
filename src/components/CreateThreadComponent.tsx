import Draggable from "react-draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CreateThreadComponent({
  setShowWindow,
}: {
  setShowWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSubmit = async (formData: FormData) => {
    const rawData = {
      name: formData.get("nama"),
      title: formData.get("title"),
      options: formData.get("options"),
      content: formData.get("content"),
      picture: formData.get("picture"),
    };

    console.log(rawData);
  };
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
            <Input type="text" placeholder="Nama" name="nama" />
            <Input type="text" placeholder="Title" name="title" />
            <Input type="text" placeholder="Options" name="options" />
          </div>

          <Textarea placeholder="Content" name="content" />
          <Input id="picture" type="file" name="picture" />
          <Button className="bg-red-900 font-semibold" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Draggable>
  );
}
