import React, { useEffect, useRef } from "react";
import Marzipano from "marzipano";

import one from "../assets/360/1.jpg";
import two from "../assets/360/2.jpg";
import three from "../assets/360/3.jpg";


const MarzipanoViewer = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Create Marzipano viewer
    const viewer = new Marzipano.Viewer(viewerRef.current);

    // Utility: create scene
    const createScene = (url, hotspotConfig = []) => {
      const source = Marzipano.ImageUrlSource.fromString(url);
      const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
      const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
      const view = new Marzipano.RectilinearView(null, limiter);
      const scene = viewer.createScene({ source, geometry, view });

      // Add hotspots
      hotspotConfig.forEach(h => {
        const el = document.createElement("div");
        el.innerHTML = "⬅"; // simple arrow (can style with CSS)
        el.style.cursor = "pointer";
        el.style.color = "white";
        el.style.fontSize = "32px";
        el.style.textShadow = "1px 1px 4px black";

        el.addEventListener("click", () => {
          h.target.switchTo();
        });

        scene.hotspotContainer().createHotspot(el, { yaw: h.yaw, pitch: h.pitch });
      });

      return scene;
    };

    // Create panoramas
    const scene1 = createScene(one);
    const scene2 = createScene(two);
    const scene3 = createScene(three);

    // Link panoramas with hotspots
    // Example: scene1 -> scene2
    scene1.hotspotContainer().createHotspot(
      (() => {
        const el = document.createElement("div");
        el.innerHTML = "➡"; // arrow
        el.style.cursor = "pointer";
        el.style.fontSize = "32px";
        el.style.color = "white";
        el.addEventListener("click", () => scene2.switchTo());
        return el;
      })(),
      { yaw: 0, pitch: 0 }
    );

    // scene2 -> scene3
    scene2.hotspotContainer().createHotspot(
      (() => {
        const el = document.createElement("div");
        el.innerHTML = "➡";
        el.style.cursor = "pointer";
        el.style.fontSize = "32px";
        el.style.color = "white";
        el.addEventListener("click", () => scene3.switchTo());
        return el;
      })(),
      { yaw: Math.PI / 2, pitch: 0 }
    );

    // scene3 -> scene1 (loop back)
    scene3.hotspotContainer().createHotspot(
      (() => {
        const el = document.createElement("div");
        el.innerHTML = "↩";
        el.style.cursor = "pointer";
        el.style.fontSize = "32px";
        el.style.color = "white";
        el.addEventListener("click", () => scene1.switchTo());
        return el;
      })(),
      { yaw: -Math.PI / 2, pitch: 0 }
    );

    // Start viewer with first pano
    scene1.switchTo();

  }, []);

  return <div ref={viewerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default MarzipanoViewer;
