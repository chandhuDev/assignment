type Props = {
  title: string;
  value: number;
  text: string;
  first: boolean;
};

function cardInfo({ title, value, text, first }: Props) {
  return (
    <div className="w-2/5 h-2/5 rounded-lg shadow-lg">
      <div
        className={`flex flex-col justify-center w-full h-full items-center ${
          first ? "bg-white" : "bg-sky-100/50"
        } ${first ? "py-4" : "py-2"} ${first ? "rounded-lg" : "rounded-md"}`}
      >
        <p
          className={`${
            first ? "text-gray-500" : "text-[#307ED9]"
          } text-[14px] font-bold`}
        >
          {title}
        </p>
        <p className="font-bold text-3xl">{value}</p>
        <p
          className={`text-[12px] ${
            first ? "text-gray-500" : "text-[#294F7C]"
          } w-3/4 text-center`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default cardInfo;
