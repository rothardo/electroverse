import Link from "next/link";
import styles from "./warning.module.scss";
import { LinkedinIcon } from "@/components/icons/svgIcons";

const Warning = () => {
  return (
    <div className="fixed bottom-20 w-full flex justify-center text-white z-5">
      <div className="flex max-w-[90vw] flex-col justify-center items-center gap-4 rounded-lg p-4 bg-blue-500/80 text-center font-normal text-lg backdrop-blur-3xl">
        <span>
          This website was created for portfolio purposes and is NOT a real
          business.
        </span>
        <div className="flex items-center justify-center gap-4">
          <span>Contact: </span>
          <Link
            href={"https://www.linkedin.com/in/ashwintemkar/"}
            title="My LinkedIn Profile"
            target="_blank"
          >
            <LinkedinIcon width={20} strokeWidth={0} />
            LinkedIn
          </Link>
          <Link
            href={"mailto:ashwintemkar@gmail.com"}
            title="Send Me an Email!"
          >
            Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Warning;
