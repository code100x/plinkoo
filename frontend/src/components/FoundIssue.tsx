export const FoundIssue = () => {
  return (
    <div className="mb-24 lg:mb-32 mt-16 lg:mt-0 bg-[#262522] w-[96%] max-w-screen-lg mx-auto px-14 py-14 rounded-[36px]">
      <div className="lg:grid grid-cols-[45%,1fr] gap-28">
        <div className="rounded-xl">
          <img
            src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657312/undraw_questions_re_1fy7_kqjpu3.svg"
            alt="chess-board"
          />
        </div>
        <div className="mt-16 lg:mt-0">
          <h1 className="text-6xl text-white font-bold text-left mt-[-10px]">
            Found an Issue!
          </h1>
          <p className="text-xl mt-6 text-white">
            Please create an issue in our github website below. You are also
            invited to contribute on the project.
          </p>

          <a
            href="https://github.com/code100x/plinkoo/issues"
            target="_blank"
            className="mt-10 text-white rounded-2xl px-4 py-4 border border-slate-400 bg-transparent w-full text-2xl flex gap-10 items-center justify-center"
          >
            <img
              className="w-16 h-16"
              src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1713657100/github-svgrepo-com_uosbko.svg"
              alt="icon"
            />
            <p className="text-4xl">Github</p>
          </a>
        </div>
      </div>
    </div>
  );
};
