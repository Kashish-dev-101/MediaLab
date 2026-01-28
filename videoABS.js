"use strict";

// Video JSON data (unchanged)
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

// ------------ DOM refs ------------

const videoContainer = document.querySelector("#video-container");
const categoryButtons = document.querySelectorAll(".category");

const IK_URL_ENDPOINT = "https://ik.imagekit.io/Kashish12345/app";

// keep references in case you want to pause/cleanup later
const cardPlayers = new Map();

/* ---------------------------
   ImageKit HLS URL builder
---------------------------- */

function buildImageKitHlsUrl(video) {
  const sourceUrl = video.sources?.[0];
  if (!sourceUrl) return "";

  if (typeof ImageKit === "undefined") {
    //console.warn("ImageKit SDK not loaded, falling back to original URL");
    return sourceUrl;
  }

  const tr = ImageKit.buildTransformationString([
    { streamingResolutions: [240, 360, 480, 720, 1080] },
  ]);

  // keep .mp4 and append /ik-master.m3u8 after it
  const ikHlsUrl = ImageKit.buildSrc({
    urlEndpoint: IK_URL_ENDPOINT,
    src: `/${sourceUrl}/ik-master.m3u8`,
    queryParameters: { tr },
  });

  //console.log("IK HLS URL:", ikHlsUrl);
  return ikHlsUrl;
}

/* ---------------------------
   Init a Video.js player for one card
---------------------------- */

function initCardPlayer(videoEl, video, index) {
  // Try HLS via ImageKit first
  const hlsUrl = buildImageKitHlsUrl(video);
  const fallbackUrl = video.sources?.[0] || "";

  // If we got a .m3u8 use HLS type, else MP4
  const srcUrl = hlsUrl || fallbackUrl;
  const type = srcUrl.includes(".m3u8") ? "application/x-mpegURL" : "video/mp4";

  const player = videojs(videoEl, {
    // controls: true,
    // autoplay: index === 0, // auto-play only first video
    // muted: true,
    // preload: "metadata",
    // fluid: true,
    // html5: {
    //   vhs: { overrideNative: true },
    //   nativeAudioTracks: false,
    //   nativeVideoTracks: false,
    // },
    controls: true,
    autoplay: false,
    muted: true,
    preload: "metadata",
    fluid: true,
    html5: {
      vhs: {
        overrideNative: true,

        limitRenditionByPlayerDimensions: true,
        useDevicePixelRatio: true,

        enableLowInitialPlaylist: true,

        goalBufferLength: 15,
        bufferLowWaterLine: 5,
        bufferHighWaterLine: 30,

        experimentalBufferBasedABR: true,
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false,
    },
  });

  player.src({ src: srcUrl, type });

  player.httpSourceSelector();

  // player.ready(() => {
  //   player.controlBar.addChild("SourceMenuButton", {});
  // });

  cardPlayers.set(videoEl.id, player);

  if (index === 0) {
    player.play().catch((err) => {
      //console.warn("Autoplay blocked for first card:", err);
    });
  }
}

/* ---------------------------
   Card creation (ABS players)
---------------------------- */

function createVideoCard(video, index) {
  const card = document.createElement("article");
  card.classList.add("video-card");

  const videoWrapper = document.createElement("div");
  videoWrapper.classList.add("video-wrapper");

  const videoEl = document.createElement("video");
  videoEl.classList.add("video-js", "vjs-default-skin", "video-player");
  videoEl.setAttribute("playsinline", "");
  videoEl.setAttribute("controls", "");
  videoEl.preload = "none";
  videoEl.id = `card-player-${index}`;

  if (video.thumb) {
    videoEl.poster = video.thumb;
  }

  videoWrapper.append(videoEl);

  const info = document.createElement("div");
  info.classList.add("video-info");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("video-title");
  titleEl.textContent = video.title;

  const meta = document.createElement("div");
  meta.classList.add("video-meta");
  if (video.subtitle) {
    const subtitleSpan = document.createElement("span");
    subtitleSpan.textContent = video.subtitle;
    meta.append(subtitleSpan);
  }

  const descEl = document.createElement("p");
  descEl.classList.add("video-description");
  descEl.textContent = video.description;

  info.append(titleEl, meta, descEl);

  card.append(videoWrapper, info);

  // IMPORTANT: initialise Video.js AFTER element is in the DOM
  // We'll actually call initCardPlayer from renderAllVideos
  card._videoEl = videoEl; // stash reference

  return card;
}

/* ---------------------------
   Render all videos
---------------------------- */

function renderAllVideos() {
  videoContainer.innerHTML = "";

  const moviesCategory =
    mediaData.categories.find((c) => c.name === "Movies") ||
    mediaData.categories[0];

  if (!moviesCategory) return;

  moviesCategory.videos.forEach((video, index) => {
    const card = createVideoCard(video, index);
    videoContainer.append(card);

    // Now the <video> is in the DOM – init Video.js on it
    initCardPlayer(card._videoEl, video, index);
  });
}

/* ---------------------------
   Init + category UI
---------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderAllVideos();
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    // later you can filter mediaData based on btn.textContent
  });
});
