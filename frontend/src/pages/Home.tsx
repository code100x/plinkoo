import Card from "../components/Card.tsx";
import {Footer, Navbar} from "../components";
import {games} from "../../store/gamesInfo";
import Cash from "../../public/Cash.gif"

const Home = () => {
  return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col bg-[#1a2c38] text-white font-body">
          <main className="w-screen-lg mx-auto flex-col mt-10">
            <div className="flex justify-center items-center gap-8">
              <div className="max-w-screen-lg mx-auto ">
                <h1 className="text-4xl font-bold my-8 font-mono">LEADING ONLINE CASINO</h1>
                <p className="text-lg font-serif">
                  Browse our wide range of casino games and experience a fair and enjoyable online gambling journey.
                </p>
                <p className="text-lg mb-8 font-sans">
                  Play Slots, Live Casino, Baccarat, Roulette, and many more classic casino games directly from your browser.
                </p>
              </div>
              <div className=" w-96 -mt-10">
                <img src={Cash} className="h-80"/>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg w-screen mb-24">
              <div className="flex overflow-x-auto">
                <div className="flex flex-wrap justify-center" style={{ minWidth: `${games.length * 220}px` }}>
                  {games.map((card) => (
                      <Card
                          key={card.id}
                          card={card}
                      />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer/>
      </>
  );
};

export default Home;
