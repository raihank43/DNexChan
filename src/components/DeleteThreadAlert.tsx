import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DeleteThreadAlert({
  setPassword,
  handleDeleteThread,
  thread_Id,
  loading,
}: {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteThread: (threadId: string) => Promise<any>;
  thread_Id: string;
  loading: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="p-0 w-full flex justify-start pl-2 font-semibold bg-transparent text-red-900 hover:bg-red-900 hover:text-orange-300 rounded-none">
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-orange-300 border-2 border-red-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-900 font-bold">
            Delete Thread
          </AlertDialogTitle>
          <AlertDialogDescription className="text-red-900">
            Masukkan Password Untuk Menghapus Thread
          </AlertDialogDescription>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-orange-400 border-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-900"
            onClick={() => handleDeleteThread(thread_Id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
