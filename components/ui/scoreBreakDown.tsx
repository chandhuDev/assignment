type Props = {
  text: string;
  percentage: number;
};

function scoreBreakDown({ text, percentage }: Props) {
  const percentValue = (percentage / 20) * 100;

  let gradientClass = "";
  if (percentValue <= 33) {
    gradientClass = "bg-[#FF6969]";
  } else if (percentValue <= 66) {
    gradientClass = "bg-gradient-to-r from-[#FF6969] to-[#FFBC70]";
  } else {
    gradientClass =
      "bg-gradient-to-r from-[#FF6969] via-[#FFBC70] to-[#7EFF7E]";
  }

  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className="flex w-full justify-between items-center mb-1">
        <p className="font-bold text-[16px] text-[#294F7C]">{text}</p>
        <p className="text-[#294F7C]">{percentage}/20</p>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${gradientClass} transition-all duration-300 rounded-full`}
          style={{ width: `${Math.max(5, percentValue)}%` }}
        />
      </div>
    </div>
  );
}

export default scoreBreakDown;
