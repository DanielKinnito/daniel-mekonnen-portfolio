import { GITHUB_LINK } from "@/lib/constants";
const LINK = '<https://github.com/programmer-rahul>';


export default function DesignedAndDevelopedBy() {
  return (
    <div className="text-center text-xs md:text-lg">
      <p>
        &#169; Designed And Developed By 💚{" "}
        <b className="transition hover:cursor-pointer hover:text-main hover:underline">
          <a href={LINK} target="_blank">
            Rahul
          </a>
        </b>
      </p>
    </div>
  );
}
