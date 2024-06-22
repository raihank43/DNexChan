import Draggable from "react-draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DraggableWindow() {
  return (
    <Draggable>
      <div className="bg-orange-200 p-5 max-w-52 shadow-lg rounded-md border-2 border-red-900 absolute top-1/2 left-1/2 z-50">
        <div>I can be dragged around!</div>

        <Input type="text" placeholder="Search" />
        <Button>Submit</Button>
      </div>
    </Draggable>
  );
}
