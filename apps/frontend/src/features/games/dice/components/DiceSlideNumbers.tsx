const DiceSlideNumbers = () => {
  return (
    <div className="flex items-center justify-between w-full gap-2 pl-6 pr-4">
      {[0, 25, 50, 75, 100].map(value => (
        <div className="font-semibold" key={value}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default DiceSlideNumbers;
