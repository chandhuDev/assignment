import Button from "./Button";
import InputNumber from "./InputNumber";
import Image from "next/image";
import hdfc from "@/public/hdfc.svg";
import bandhan from "@/public/bandhan.svg";
import lock from "@/public/lock.svg";
import flash from "@/public/flash.svg";

type Props = {
  stepNumber: number;
  title: string;
  desc: string;
  first: boolean;
  btnText: string;
  btnValue: number;
};

const PersonalizedCard = ({
  stepNumber,
  title,
  desc,
  first,
  btnText,
  btnValue,
}: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 px-4 py-5 bg-white flex flex-col gap-y-4 min-h-[400px] relative">
      {!first && (
        <div className="absolute inset-0 bg-gray-200/50 rounded-xl z-10"></div>
      )}
      <div className="flex flex-col gap-y-4">
        <p
          className={`font-semibold text-[12px] ${
            first ? "text-red-400" : "text-black"
          }`}
        >
          Step {stepNumber}: {first && <span>Critical</span>}
        </p>
        <p className="font-semibold text-[16px] text-[#374E6A]">{title}</p>
        <p className="font-thin text-[12px] text-[#374E6A]">{desc}</p>
      </div>
      {first ? (
        <div className="flex flex-col gap-y-2.5">
          <div className="flex flex-row w-full gap-x-4 text-[#374E6A] font-semibold">
            <p className="">I can commit to saving</p>
            <InputNumber money={"500"} isHighlighted={false} isInput={true} />
            <p className="">monthly</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-x-2 w-full h-full">
            <div className="w-2/3 flex flex-row">
              <div className="w-full flex justify-between">
                {[
                  { money: "500", isHighlighted: true, isInput: true },
                  { money: "1,000", isHighlighted: false, isInput: false },
                  { money: "5,000", isHighlighted: false, isInput: false },
                  { money: "6,000", isHighlighted: false, isInput: false },
                ].map((item, index) => {
                  return (
                    <InputNumber
                      key={index}
                      money={item.money}
                      isHighlighted={item.isHighlighted}
                      isInput={item.isInput}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-1/3 border border-l-0 border-r-0 border-t-0 border-black h-full flex flex-row justify-start items-end">
              <p>₹</p>
              <p className="text-[16px] text-gray-500">Enter amount</p>
            </div>
          </div>
          <p className="text-[#374E6A]">Recommended Funds (Top Performers)</p>
          <div className="grid grid-cols-2 justify-center items-center gap-x-2 w-full h-full">
            {[
              { img: hdfc, type: "HDFC Mid-Cap Fund", per: "26.6%(3Y)" },
              { img: bandhan, type: "Bandhan Small-Cap Fund", per: "32%(3Y)" },
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-row justify-between items-center w-full border rounded-md border-gray-500 
                    ${index === 0 ? "bg-white/75" : "bg-blue-100"} `}
                >
                  <div className="w-1/4">
                    <Image
                      src={item.img}
                      width={60}
                      height={60}
                      alt={item.type}
                    />
                  </div>

                  <div className={`flex flex-col p-2 justify-start w-3/4`}>
                    <p className="text-[12px] w-full font-normal text-ellipsis text-nowrap text-[#363636]">
                      {item.type}
                    </p>
                    <p className="text-green-600 text-[10px] w-full">
                      {item.per}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="flex-grow"></div>
      <div className="flex flex-col gap-y-4 mt-auto">
        <Button text={btnText} points={btnValue} />
        {first ? (
          <div className="flex flex-row justify-center items-center gap-x-2">
            <Image src={flash} width={15} height={15} alt="verified badge" />
            <p className="text-[#294F7c]">
              <span className="font-bold">Express setup:</span> Complete in
              under 3 minutes
            </p>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center gap-x-2">
            <Image src={lock} width={15} height={15} alt="verified badge" />

            <p className="text-[#294F7c]">
              Complete step 1(critical) to unlock
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedCard;
