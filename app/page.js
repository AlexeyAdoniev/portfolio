import Header from "@/components/header/header";
import { Dfiance } from "@/components/dfiance/section";

export default function Home() {
  return (
    <div className="app">
      <Header />
      <section id="project">
        <Dfiance />
      </section>

      {/* <section style={{ height: "200vh" }}>
        <a
          href="https://www.flaticon.com/free-icons/equipment"
          title="equipment icons"
        >
          Equipment icons created by Firststyles - Flaticon
        </a>
      </section> */}
    </div>
  );
}
