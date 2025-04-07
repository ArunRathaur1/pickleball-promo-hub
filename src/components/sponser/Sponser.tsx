import React, { useEffect } from "react";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./Page5";
import Page6 from "./page6";
import Page7 from "./page7";
import Page8 from "./page8";
import Page9 from "./page9";
import Page10 from "./page10";
import Page11 from "./page11";

export default function Sponser() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div id="main">
        <section id="home-section">
          <Page1 />
          <Page2 />
          <Page3 />
          {/* <Page4 /> */}
          <Page5 />
          <Page6 />
          <Page7 />
          <Page8 />
          <Page9 />
          <Page10 />
          <Page11 />
        </section>
      </div>
    </div>
  );
}
