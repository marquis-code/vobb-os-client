import { Routes } from "router";
import { Logo, ScreenSize } from "assets";
import { Link } from "react-router-dom";

const UnsupportedScreenSize = () => {
  return (
    <>
      <main className="h-[100dvh]">
        <section className="text-center max-w-[400px] m-auto py-8 px-4 flex flex-col items-center justify-center h-full">
          <Link to={Routes.home} className="mb-8 absolute top-4 left-4">
            <Logo />
          </Link>
          <ScreenSize className="w-[60%] h-auto max-w-[240px] mb-6" />
          <h1 className="font-bold text-lg sm:text-xl mb-1">Screen size not supported yet</h1>
          <p className="text-vobb-neutral-60">
            We are sorry but this screen size is not supported. Please switch to a screen larger
            than 1024px wide.
          </p>
        </section>
      </main>
    </>
  );
};

export { UnsupportedScreenSize };
