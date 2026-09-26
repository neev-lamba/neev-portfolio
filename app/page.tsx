import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Garage from "@/components/Garage";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";

// Re-render at least hourly: keeps the live cards fresh and the current role's time ticking over.
export const revalidate = 3600;

export default function Home() {
  return (
    <div
      id="top"
      className="mx-auto flex min-h-screen max-w-[1280px] flex-col px-5 pb-12 pt-10 sm:px-12 lg:px-[120px]"
    >
      <Nav />
      <main className="flex-1">
        <Intro />
        <Experience />
        <Garage />
        <About />
      </main>
      <Footer />
    </div>
  );
}
