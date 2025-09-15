"use client";

function VideoComponent() {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://www.youtube.com/embed/PlzI12r7Q1g?autoplay=1&mute=1&loop=1&playlist=PlzI12r7Q1g,UA49_ZZ00E0,FaMlZ9GtC6Y"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

export default VideoComponent;
