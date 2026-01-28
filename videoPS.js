"use strict";

// Video JSON data
const mediaData = {
  categories: [
    {
      name: "Movies",
      videos: [
        {
          title: "Big Buck Bunny",
          subtitle: "By Blender Foundation",
          description:
            "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore!\n\nLicensed under Creative Commons Attribution\nhttp://www.bigbuckbunny.org",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          ],
        },
        {
          title: "Elephant Dream",
          subtitle: "By Blender Foundation",
          description: "The first Blender Open Movie from 2006",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          ],
        },
        {
          title: "For Bigger Blazes",
          subtitle: "By Google",
          description:
            "HBO GO now works with Chromecast — the easiest way to enjoy online video on your TV.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          ],
        },
        {
          title: "For Bigger Escape",
          subtitle: "By Google",
          description:
            "Introducing Chromecast — the easiest way to enjoy online video on your TV.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          ],
        },
        {
          title: "For Bigger Fun",
          subtitle: "By Google",
          description:
            "Introducing Chromecast. The easiest way to enjoy online video and music on your TV.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          ],
        },
        {
          title: "For Bigger Joyrides",
          subtitle: "By Google",
          description:
            "For when the times call for bigger joyrides — enjoy Chromecast for $35.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          ],
        },
        {
          title: "For Bigger Meltdowns",
          subtitle: "By Google",
          description:
            "Introducing Chromecast — make Buster's big meltdowns even bigger.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          ],
        },
        {
          title: "Sintel",
          subtitle: "By Blender Foundation",
          description:
            "Sintel is an independently produced short film by the Blender Foundation.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          ],
        },
        {
          title: "Subaru Outback On Street And Dirt",
          subtitle: "By Garage419",
          description:
            "Smoking Tire takes the Subaru Outback to the highest point for a balloon launch.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          ],
        },
        {
          title: "Tears of Steel",
          subtitle: "By Blender Foundation",
          description:
            "Tears of Steel was created using an open-source VFX pipeline funded by donations.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          ],
        },
        {
          title: "Volkswagen GTI Review",
          subtitle: "By Garage419",
          description:
            "Will the Volkswagen GTI beat the Mazdaspeed3's lap time? Watch to find out.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
          ],
        },
        {
          title: "We Are Going On Bullrun",
          subtitle: "By Garage419",
          description:
            "Daily road-trip videos from the 2010 Bullrun Live Rally in a 2011 Shelby GT500.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          ],
        },
        {
          title: "What Car Can You Get For A Grand?",
          subtitle: "By Garage419",
          description: "Testing how far $1,000 can go when buying a used car.",
          thumb:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
          sources: [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
          ],
        },
      ],
    },
  ],
};

/* -------------------------
   CONFIG
----------------------------*/
//const MODE = "hls";
const IK_URL_ENDPOINT = "https://ik.imagekit.io/Kashish12345/app";

/* -------------------------
   DOM ELEMENTS
----------------------------*/
const videoContainer = document.querySelector("#video-container");
const categoryButtons = document.querySelectorAll(".category");
//let videojsPlayer = null;

// /* -------------------------
//    VIDEO.JS PLAYER (HLS MODE)
// ----------------------------*/
// function playHlsVideo(hlsUrl) {
//   const el = document.getElementById("video-player");
//   if (!el) return console.warn("Main #video-player missing.");

//   if (!videojsPlayer) {
//     videojsPlayer = videojs("video-player", {
//       controls: true,
//       autoplay: true,
//       muted: true,
//       preload: "none",
//       fluid: true,
//       html5: {
//         vhs: { overrideNative: true },
//         nativeAudioTracks: false,
//         nativeVideoTracks: false,
//       },
//     });
//   }

//   console.log("Playing HLS:", hlsUrl);

//   videojsPlayer.src({
//     src: hlsUrl,
//     type: "application/x-mpegURL",
//   });

//   videojsPlayer.play().catch((err) => {
//     console.warn("Autoplay blocked:", err);
//   });
// }

/* -------------------------
   IMAGEKIT URL BUILDERS
----------------------------*/
function buildImageKitProgressiveUrl(video) {
  const sourceUrl = video.sources[0];
  if (!sourceUrl) return sourceUrl;

  const tr = ImageKit.buildTransformationString([{ width: 1280, height: 720 }]);

  return ImageKit.buildSrc({
    urlEndpoint: IK_URL_ENDPOINT,
    src: `/${sourceUrl}`,
    queryParameters: { tr },
  });
}

// function buildImageKitHlsUrl(video) {
//   const sourceUrl = video.sources[0];

//   const tr = ImageKit.buildTransformationString([
//     { streamingResolutions: [240, 360, 480, 720, 1080] },
//   ]);

//   // Keep .mp4 → append /ik-master.m3u8 AFTER it
//   return ImageKit.buildSrc({
//     urlEndpoint: IK_URL_ENDPOINT,
//     src: `/${sourceUrl}/ik-master.m3u8`,
//     queryParameters: { tr },
//   });
// }

/* -------------------------
   CARD CREATION (PROGRESSIVE)
----------------------------*/
function createProgressiveCard(video) {
  const card = document.createElement("article");
  card.classList.add("video-card");

  const wrapper = document.createElement("div");
  wrapper.classList.add("video-wrapper");

  const videoEl = document.createElement("video");
  videoEl.classList.add("video-player");
  videoEl.controls = true;
  videoEl.preload = "none";

  videoEl.src = buildImageKitProgressiveUrl(video);

  if (video.thumb) videoEl.poster = video.thumb;

  wrapper.append(videoEl);
  card.append(wrapper, buildInfo(video));

  return card;
}

// /* -------------------------
//    CARD CREATION (HLS)
// ----------------------------*/
// function createHlsCard(video) {
//   const card = document.createElement("article");
//   card.classList.add("video-card");

//   const wrapper = document.createElement("div");
//   wrapper.classList.add("video-wrapper");

//   const placeholder = document.createElement("div");
//   placeholder.classList.add("hls-placeholder");
//   placeholder.textContent = "Streaming via HLS";
//   wrapper.append(placeholder);

//   card.append(wrapper, buildInfo(video));

//   // CLICK → load into Video.js
//   card.addEventListener("click", () => {
//     playHlsVideo(buildImageKitHlsUrl(video));
//   });

//   return card;
// }

/* -------------------------
   COMMON INFO BLOCK
----------------------------*/
function buildInfo(video) {
  const info = document.createElement("div");
  info.classList.add("video-info");

  const titleEl = document.createElement("h2");
  titleEl.textContent = video.title;

  const meta = document.createElement("div");
  meta.classList.add("video-meta");

  if (video.subtitle) {
    const s = document.createElement("span");
    s.textContent = video.subtitle;
    meta.append(s);
  }

  const desc = document.createElement("p");
  desc.classList.add("video-description");
  desc.textContent = video.description;

  info.append(titleEl, meta, desc);
  return info;
}

/* -------------------------
   RENDER MODES
----------------------------*/
function renderProgressiveMode() {
  videoContainer.innerHTML = "";
  const videos = mediaData.categories[0].videos;

  videos.forEach((v) => videoContainer.append(createProgressiveCard(v)));
}

// function renderHlsMode() {
//   videoContainer.innerHTML = "";
//   const videos = mediaData.categories[0].videos;

//   videos.forEach((v) => videoContainer.append(createHlsCard(v)));

//   // autoplay the first one
//   playHlsVideo(buildImageKitHlsUrl(videos[0]));
// }

/* -------------------------
   INIT
----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  renderProgressiveMode();
});

/* -------------------------
   CATEGORY BUTTONS UI
----------------------------*/
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
