import Image from "next/image";
import { UserIcon } from "../svg";

export const ProfileImage = ({ src }: { src?: string }) => {
  return src ? (
    <Image
      priority
      src={src}
      alt={"profile_pic"}
      height={720}
      width={640}
      className="size-full object-cover object-center"
    />
  ) : (
    <UserIcon className="size-full" />
  );
};
