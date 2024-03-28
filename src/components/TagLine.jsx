import Typewriter from "typewriter-effect";
import musicIcon from "../assets/images/music-icon.png";

export default function TagLine() {
  const options = {
    strings: ['Rock Music', 'Pop Music', 'Hip-Hop Music', 'Rap Music'],
    autoStart: true,
    loop: true
  }

  return (
    <div className="bg-[#0A0A0A]/75 dark:bg-[#1F2937] text-white grid grid-rows-1 place-items-center h-full px-4">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold sm:mb-4 text-white dark:text-white md:text-4xl">Create Awesome</h1>
        <h1 className="text-2xl font-semibold mb-2 sm:mb-4 text-white dark:text-white md:text-4xl">
          <Typewriter options={options} />
        </h1>
        <div className="mb-2">
          <img className="w-1/2 m-auto lg:w-auto lg:m-0" src={musicIcon} alt="TuneCraft Music Icon" />
        </div>
        <h1 className="text-2xl font-semibold text-white dark:text-white md:text-4xl">In Less Than Few Minutes</h1>
      </div>
    </div>
  )
}
