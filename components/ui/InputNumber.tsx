type Props = {
  money: string;
  isHighlighted: boolean;
  isInput: boolean;
};

function InputNumber({ money, isHighlighted, isInput }: Props) {
  return (
    <div
      className={`rounded-md flex justify-center items-center px-3 py-1 text-black/80  ${
        isHighlighted ? "border border-black" : "border-none"
      } ${isInput ? "bg-blue-100" : "bg-white/80"}`}
    >
      <p>${money}</p>
    </div>
  );
}

export default InputNumber;
