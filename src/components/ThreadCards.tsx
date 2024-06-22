"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ThreadCards({
  imageUrl,
  params,
}: {
  imageUrl: string;
  params: { boards: string };
}) {
  const router = useRouter();
  const item = {
    title: "Thread Title",
    img: "https://i.pinimg.com/736x/88/53/1c/88531c7511bccb1f899a8b330a05fb43--pokemon-games-penguin.jpg",
  };
  return (
    <Link href={`${params.boards}/thread/2`}>
      <Card shadow="sm" isHoverable >
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={item.title}
            className="w-full object-fit min-h-[150px] max-h-[250px]"
            src={imageUrl}
          />
          <div className="flex flex-col justify-center p-3 items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm">0 / 0 / 0</p>
              <h3 className="text-xl font-bold text-default-900">
                {item.title}
              </h3>
            </div>

            <div className="flex justify-center">
              <p className="text-default-900 text-sm text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam,
                repudiandae possimus? Magni, quo expedita quidem iste quae
                maxime unde consequatur eos asperiores? Doloremque quidem iure
                facilis expedita repellendus sit dolorum.
              </p>
            </div>
          </div>
        </CardBody>

        {/* <CardFooter className="text-small justify-between">
        <b>Thread Title</b>
        <p className="text-default-500">{item.price}</p>
      </CardFooter> */}
      </Card>
    </Link>
  );
}
