import ThreadRepliesInterface from "@/interfaces/threadRepliesInterface";

// Function to process existing repliesData to update listReplies based on content references
export default function processExistingReplies(
  repliesData: ThreadRepliesInterface[]
) {
  // Loop through each reply in repliesData
  repliesData.forEach((reply, index, repliesArray) => {
    // Check if '>>' is in the content and followed by a number
    if (reply.content.includes(">>") && />>\d+/.test(reply.content)) {
      // Extract numbers from the content of the reply
      const referencedPostNumbers = [
        ...(reply.content
          .match(/>>\d+/g)
          ?.map((match) => parseInt(match.slice(2))) ?? []),
      ];

      // Loop through each referencedPostNumber
      referencedPostNumbers.forEach((postNumber) => {
        // Find the reply in repliesData that matches the postNumber
        const targetReply = repliesArray.find(
          (r) => r.postNumber === postNumber
        );
        if (
          targetReply &&
          !targetReply.listReplies?.includes(reply.postNumber)
        ) {
          // Update the listReplies of the targetReply if not already included
          targetReply.listReplies?.push(reply.postNumber);
        }
      });
    }
  });

  // Return the updated repliesData
  return repliesData;
}
