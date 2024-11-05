import Link from "next/link";
import Image from "next/image";

import styles from "./wideAd.module.scss";

interface IProps {
  imgUrl: string;
  linkText?: string;
  url: string;
  title: string;
  isLightBG?: boolean;
  smallTitle: string;
}

const WideAd = ({
  imgUrl,
  linkText = "Show Deals",
  smallTitle,
  title,
  url,
  isLightBG = false,
}: IProps) => {
  return (
    <div
      className={`relative h-[200px] flex-grow font-[1.6rem] pl-[30px] ${styles.wideAd} ${
        isLightBG ? "darkText" : "lightText"
      }`}
    >
      <span className="mt-[40px] block leading-[0] font-[1.4rem]">{smallTitle}</span>
      <h3 className="font-[1.8rem] font-medium block mt-[18px] mb-[70px]">{title}</h3>
      <Link href={url} className="font-medium">{linkText}</Link>
      <Image src={imgUrl} fill alt={title} sizes="(max-width:440px)" className="absolute z-10 rounded-[12px] w-full h-full object-cover" />
    </div>

  );
};

export default WideAd;
