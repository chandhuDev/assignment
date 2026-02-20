type Props = {
  text: string;
  points: number;
};

type InnerTextProps = {
  point: number;
};

function Button({ text, points }: Props) {
  return (
    <div className="w-full py-2 rounded-full flex justify-center items-center text-black bg-linear-to-r from-blue-900 to-blue-400">
      <p className="text-white font-bold">{text}</p>
      <InnerButton point={points} />
    </div>
  );
}

function InnerButton({ point }: InnerTextProps) {
  return (
    <div className="rounded-5xl px-2 py-1 items-center justify-center flex bg-white rounded-full ml-5">
      <p className="text-green-400 ml-1">
        +{point}
        <span className="ml-1But">pts</span>
      </p>
    </div>
  );
}

export default Button;
