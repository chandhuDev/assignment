import Image from "next/image";
import wealthupLogo from "@/public/wealthup.svg";
import verfiedBadge from "@/public/Vector.svg";
import ArcMeter from "../components/ui/GuageMeter";
import ScoreBreakDown from "@/components/ui/scoreBreakDown";
import CardInfo from "@/components/ui/cardInfo";
import PersonalizedCard from "../components/ui/PersonalizedCard";

export default function Home() {
  return (
    <div className="flex min-h-screen  bg-sky-50">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 ">
        <div className="flex flex-col w-full h-full;">
          <div className="w-full h-full flex justify-center items-center mb-10">
            <Image
              src={wealthupLogo}
              width={120}
              height={120}
              alt="wealthup logo"
            />
          </div>
          <div className="w-full h-full flex flex-row justify-between mb-8">
            <div className="font-normal">
              <p className="text-[28px] text-[#294F7c]">
                Good morning, <span className="font-bold">Ankit!</span>
              </p>
              <p className="text-[22px] text-[#294F7c]">
                At <span className="font-bold">28,</span>your income is strong,
                but your wealth efficiency is lagging.
              </p>
            </div>
            <div className="bg-green-200 rounded-full h-1/2 px-4 flex items-center justify-center">
              <Image
                src={verfiedBadge}
                width={15}
                height={15}
                alt="verified badge"
              />
              <p>Verified Analysis</p>
            </div>
          </div>
          <div className="rounded-3xl w-full h-full flex flex-row justify-between mb-10 shadow-lg bg-white">
            <div className="w-2/5">
              <ArcMeter />
            </div>
            <div className="h-full w-3/5 p-5">
              <p className="text-[20px] text-[#294F7c]">
                Financial independence age
              </p>
              <div className="w-2/3 flex flex-row bg-red mt-2">
                {[
                  {
                    title: "Current Trajectory",
                    value: 65,
                    text: "Based on current savings you have",
                    first: true,
                  },
                  {
                    title: "Your Potential",
                    value: 38,
                    text: "By following our personalized roadmap",
                    first: false,
                  },
                ].map((item, index) => (
                  <CardInfo
                    key={index}
                    title={item.title}
                    value={item.value}
                    text={item.text}
                    first={item.first}
                  />
                ))}
              </div>
              <div>
                <p className="text-[20px] text-[#294F7C] mb-2 mt-6">
                  Your score breakdown
                </p>
                <div className="w-full h-full grid grid-cols-3 gap-y-5 gap-x-6">
                  {[
                    { text: "Emergency Funds", precentage: 0 },
                    { text: "Liquidity", precentage: 11 },
                    { text: "Investments", precentage: 20 },
                    { text: "Health Insurance", precentage: 20 },
                    { text: "Life Insurance", precentage: 7 },
                    { text: "Savings", precentage: 16 },
                  ].map((item) => {
                    return (
                      <ScoreBreakDown
                        key={item.text}
                        text={item.text}
                        percentage={item.precentage}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg w-full h-full bg-white shadow-2xl p-4">
            <p className="my-5 text-[24px] text-[#294F7c]">
              Your personalized roadmap to{" "}
              <span className="font-bold text-[24px] mr-1">70+ WealthUp</span>
              score
            </p>
            <div className="w-full grid grid-cols-3 gap-5 mt-6">
              {[
                {
                  stepNumber: 1,
                  title: "Build your safety net (Emergency fund)",
                  desc: "Ankit, avoid a potential 2-year setback. Build your emergency fund to be risk-free within the next 6 months.",
                  first: true,
                  btnText: "Start Investing Today",
                  btnValue: 20,
                },
                {
                  stepNumber: 2,
                  title: "Optimize investments",
                  desc: "Invest regularly to build long-term wealth. Explore diversified mutual funds and asset allocation strategies tailored to your risk profile.",
                  first: false,
                  btnText: "Begin Investing",
                  btnValue: 12,
                },
                {
                  stepNumber: 3,
                  title: "Maximize growth",
                  desc: "Accelerate your financial future by reviewing advanced growth options, retirement planning, and tax-efficient investment vehicles.",
                  first: false,
                  btnText: "Analyse your Mutual Funds",
                  btnValue: 8,
                },
              ].map((item, index) => {
                return (
                  <PersonalizedCard
                    key={index}
                    stepNumber={item.stepNumber}
                    title={item.title}
                    desc={item.desc}
                    first={item.first}
                    btnText={item.btnText}
                    btnValue={item.btnValue}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
