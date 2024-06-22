import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export default function ThreadCards() {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
        <div className="flex flex-wrap items-center justify-center mt-2">
          <p className="text-default-500 max-w-60 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo culpa
            ducimus dolorem aperiam pariatur dolores beatae adipisci itaque
            molestiae sapiente, provident nisi perspiciatis rem, harum hic
            mollitia perferendis asperiores accusamus.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
