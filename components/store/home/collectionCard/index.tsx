import Link from "next/link";
import Image from "next/image";
import { TCollectionCard } from "@/types/collections";

interface IProps {
  collection: TCollectionCard;
}

const CollectionCard = ({ collection }: IProps) => {
  return (
    <div className="min-w-[324px] h-[250px] flex relative rounded-2xl bg-white overflow-hidden mb-20">
      <div className="flex-grow ml-10">
        <h2 className="text-lg font-medium text-[#667085] mt-8 mb-4">
          {collection.name}
        </h2>
        {collection.collections.map((collection, index) => (
          <Link
            href={collection.url}
            key={index}
            className="block relative text-base leading-6 text-[#A0AEC0]"
          >
            {collection.label}
          </Link>
        ))}
      </div>

      <div className="absolute top-4 right-6 w-[140px] h-[180px]">
        <Image
          src={collection.imgUrl}
          alt={collection.name}
          fill
          sizes="(max-width:140px)"
          className="object-cover"
        />
      </div>
      <Link
        href={collection.url}
        className="absolute right-8 bottom-8 pr-8 text-base font-medium text-[#A0AEC0] hover:text-[#667085] bg-no-repeat bg-right-center bg-[url('/images/icons/arrowIcon01.svg')]"
      >
        {`All ${collection.name}`}
      </Link>
    </div>
  );
};

export default CollectionCard;
