import Image from "next/image";
import image from "../../public/RecruitCRM.png";
import Link from "next/link";
import HeaderItems from "./HeaderItems";
const Header: React.FC = () => {
  return (
    <div className="sticky top-0 backdrop-blur-sm bg-white/30 h-20 pt-3 flex justify-center">
      <div className="flex justify-between w-3/4 gap-5">
        <Link href="/">
          <Image src={image} width={60} height={60} alt="Recruit Crm" />
        </Link>
        <HeaderItems />
      </div>
    </div>
  );
};

export default Header;
