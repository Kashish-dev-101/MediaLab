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
            "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself.",
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
      ],
    },
  ],
};

/* -------------------------
   CONFIG
----------------------------*/
const IK_URL_ENDPOINT = "https://ik.imagekit.io/Kashish12345/app";

/* -------------------------
   DOM ELEMENTS
----------------------------*/
const videoContainer = document.querySelector("#video-container");

/* -------------------------
   INTERSECTION OBSERVER FOR AUTOPLAY
----------------------------*/
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6, // 60% visible to trigger
};

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;

    if (entry.isIntersecting) {
      // Video is in viewport - play it
      video.play().catch(() => {
        // Autoplay blocked - user interaction required
      });
    } else {
      // Video left viewport - pause it
      video.pause();
    }
  });
}, observerOptions);

/* -------------------------
   IMAGEKIT URL BUILDER
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

/* -------------------------
   CARD CREATION (INSTASTREAM)
----------------------------*/
function createInstaCard(video) {
  const card = document.createElement("article");
  card.classList.add("video-card");

  const wrapper = document.createElement("div");
  wrapper.classList.add("video-wrapper");

  const videoEl = document.createElement("video");
  videoEl.classList.add("video-player");
  videoEl.controls = true;
  videoEl.muted = true; // Muted for autoplay to work
  videoEl.loop = true; // Loop like Instagram
  videoEl.playsInline = true;
  videoEl.preload = "metadata";

  videoEl.src = buildImageKitProgressiveUrl(video);

  if (video.thumb) videoEl.poster = video.thumb;

  // Observe this video for autoplay
  videoObserver.observe(videoEl);

  wrapper.append(videoEl);
  card.append(wrapper, buildInfo(video));

  return card;
}

/* -------------------------
   COMMON INFO BLOCK
----------------------------*/
function buildInfo(video) {
  const info = document.createElement("div");
  info.classList.add("video-info");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("video-title");
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
   RENDER
----------------------------*/
function renderInstaMode() {
  videoContainer.innerHTML = "";
  const videos = mediaData.categories[0].videos;

  videos.forEach((v) => videoContainer.append(createInstaCard(v)));
}

/* -------------------------
   INIT
----------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  renderInstaMode();
});
