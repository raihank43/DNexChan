import { TooltipContent } from "@/components/ui/tooltip";
import ThreadRepliesInterface from "@/interfaces/threadRepliesInterface";
import dateFormatter from "@/utils/dateFormatter";
import formatBytes from "@/utils/formatBytes";
import GreentextFormatter from "@/utils/greentextFormatter";
import { Image } from "@nextui-org/image";

export function RepliesQuotationHover({
  threadReplies,
  postNumberTarget,
}: {
  threadReplies: ThreadRepliesInterface[];
  postNumberTarget: Number;
}) {
  // mencari post yang sesuai dengan postNumberTarget
  const reply = threadReplies.find(
    (reply) => reply.postNumber === postNumberTarget
  ) as ThreadRepliesInterface;
  return (
    <TooltipContent className="p-0 border-none bg-transparent shadow-2xl">
      <div
        className={`flex flex-col items-center sm:flex-col md:items-stretch bg-orange-100 min-w-[100px] max-w-fit pt-0 rounded-lg shadow-md`}
      >
        <div
          className={`flex w-full md:flex-row items-center gap-2  flex-wrap bg-orange-200 p-2 rounded-t-lg border-t-2 border-x-2 border-orange-300 `}
        >
          <p className="text-green-700 text-sm font-semibold">{reply.name}</p>

          <p className="text-orange-700 text-sm ">
            {dateFormatter(reply.createdAt)}
          </p>

          <p className="text-orange-900 text-sm font-semibold">
            {`No. ${reply.postNumber}`}
          </p>
        </div>

        <div
          className={`border-2 border-t-0 rounded-lg rounded-t-none border-orange-300 w-full  `}
        >
          {reply.imageUrl && (
            <div className="flex gap-2 self-stretch p-3 pb-0 ">
              <a
                href={reply.imageUrl}
                className="text-xs underline text-center text-red-900 font-bold hover:text-red-700 ease-in-out duration-500"
                target="_blank"
              >
                {reply?.fileName?.length && reply.fileName?.length > 70
                  ? `${reply.fileName.slice(0, 70)}...`
                  : reply.fileName}
              </a>

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
                  className={`object-contain min-h-[100px] max-h-[150px] transition-all ease-in-out duration-500`}
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
    </TooltipContent>
  );
}
