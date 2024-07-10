"use serve";
import Image from "next/image";
import hero from "../../public/hero.svg";
const Hero: React.FC = () => {
  return (
    <div className="flex  items-center justify-center h-1/2 px-5 pt-5">
      <div className="w-3/4 h-1/2 bg flex justify-between gap-20 p-5">
        <div className="flex flex-col justify-center">
          <h3 className="text-left text-6xl font-bold font-serif">
            Join Your new
          </h3>
          <h1 className="text-left text-6xl font-bold text-red-400 font-serif">
            Company
          </h1>
          <span className="mt-5 text-gray-700 font-mono">
            Empowe your career with a dynamic and collaborative work environment
          </span>
          <button className="mt-5 text-left bg-red-500 w-1/4 p-2 rounded-2xl text-white px-2.5 hover:bg-red-700">
            GET STARTED
          </button>
        </div>
        <div>
          <Image src={hero} width={500} height={500} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
