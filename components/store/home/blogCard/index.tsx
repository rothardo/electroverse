import Image from "next/image";
import Link from "next/link";
import { TBlogCard } from "@/types/common";

const HomeBlogCard = ({ title, imgUrl, shortText, url }: TBlogCard) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={url} className="relative w-full h-64">
        <Image src={imgUrl} fill alt={title} sizes="(max-width:430px)" className="object-cover" />
      </Link>
      <Link href={url}>
        <h2 className="text-lg font-medium text-gray-700 mt-4 mb-2 mx-6 border-b border-white">
          {title}
        </h2>
      </Link>
      <span className="text-base leading-6 mx-6 mb-6 text-gray-600">
        {shortText.length > 180 ? shortText.slice(0, 180) + "..." : shortText}
      </span>
    </div>

  );
};

export default HomeBlogCard;
