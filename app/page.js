import Header from "@/components/header/header";
import ProjectDemo from "@/components/demo";
import { NoMobile } from "@/components/nomobile";

export default function Home() {
  return (
    <>
      <div className="app">
        <Header />
        <ProjectDemo />
        {/* {false && (
          <section style={{ height: "200vh" }}>
            {false && (
              <a
                href="https://www.flaticon.com/free-icons/equipment"
                title="equipment icons"
              >
                Equipment icons created by Firststyles - Flaticon
              </a>
            )}
          </section>
        )} */}
      </div>
      <div className="nomobile">
        <NoMobile />
      </div>
    </>
  );
}
