import Link from "next/link";

interface IProps {
  width: number;
  bgPositionX: number;
  url: string;
}

const HCompanyLogo = ({ bgPositionX, url, width }: IProps) => {
  return (
    <Link
      className="bg-no-repeat bg-center bg-[url('/images/icons/companiesIcons.png')] h-[60px] opacity-80 hover:opacity-100 transition-opacity duration-300"
      style={{ width: width }}
      href={url}
    />
  );
};

export default HCompanyLogo;
