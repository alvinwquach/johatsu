"use client";

function LocalVideo() {
  return (
    <div className="w-full max-w-3xl mt-12 aspect-video">
      <video
        className="w-full h-full rounded-lg shadow-lg object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        <source
          src="/videos/D0bdDAFhmwgLPcYpbHD4rJH8AwoBruYg666YxW9le_g.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default LocalVideo;
