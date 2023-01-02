import React, { useEffect, useState, useRef } from "react";

const NAME = "Hello";
const RESOLUTION = 100;
const colors = ["#006984", "#0054a2", "#e6e8ea", "#000000"];

const getParticles = (canvas) => {
  const ctx = canvas.getContext("2d");

  const result = [];
  const text = NAME;
  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;
  ctx.fillStyle = "black";

  // The default font is 10px sans-serif.
  const width = ctx.measureText(text).width;
  const scaler = (RESOLUTION / width) * 0.9; // 90% of width

  ctx.font = `${10 * scaler}px sans-serif`;

  ctx.fillText(text, RESOLUTION / 2 - (width * scaler) / 2, RESOLUTION / 2);

  /*
  // wanna see the pixels?
  var MIME_TYPE = "image/png";

  var imgURL = canvas.toDataURL(MIME_TYPE);
  
  var dlLink = document.createElement("a");
  dlLink.download = "canvas.png";
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(
    ":"
  );
  
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
  */

  const idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const buffer32 = new Uint32Array(idata.data.buffer);
  for (let x = 0; x < canvas.width; x += 1) {
    for (let y = 0; y < canvas.height; y += 1) {
      if (buffer32[y * canvas.width + x]) {
        const color = Math.round(Math.random() * (colors.length - 1));
        result.push({
          x: x / RESOLUTION,
          y: y / RESOLUTION,
          color: colors[color],
          time: Math.random(),
        });
      }
    }
  }

  return result;
};

function Bubble() {
  const [particles, setParticles] = useState();
  const canvasRef = useRef(null);

  useEffect(() => {
    setParticles(getParticles(canvasRef.current));
  }, []);

  const svgSize = 1000;
  return (
    <div className="bubbles">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {particles &&
          particles.map((item, i) => {
            return (
              <g
                transform={`translate(${svgSize * item.x} ${svgSize * item.y})`}
                key={i}
              >
                <circle
                  className="bubble_circle"
                  cx={0}
                  cy={0}
                  r={10}
                  fill={item.color}
                  style={{ animationDelay: `${4 * item.time}s` }}
                />
              </g>
            );
          })}
      </svg>
    </div>
  );
}

export default Bubble;
