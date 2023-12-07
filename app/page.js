import Header from "@/components/header/header";
import ProjectDemo from "@/components/demo";

export default function Home() {
  return (
    <div className="app">
      {true && <Header />}
      <ProjectDemo />
      {false && (
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
      )}
    </div>
  );
}
