import Image from "next/image";
import { Nav } from "@/common/nav";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "700" });

export default function Home() {
  return (
    <main className="home">
      <header>
        <div className="top-line">
          <Nav />
        </div>
        <div className="container">
          <div className="board">
            <div className="board-head"></div>
            <div className="board-content">
              <div className="board-content_text">
                <a href="">Github</a>
                <h1 className={montserrat.className}>
                  Alexey
                  <br /> Adoniev
                </h1>
                <p>Passionate developer and web artist</p>
              </div>
              <div className="board-content_interactive">
                <div className="search-bar"></div>
                <div className="interactive-menu">
                  <div className="interactive-menu_sidebar"></div>
                  <div className="interactive-menu_image"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
