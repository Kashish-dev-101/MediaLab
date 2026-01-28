"use strict";

// DOM references
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#generate-btn");
const imgSection = document.querySelector("#image-container");
const categoryButtons = document.querySelectorAll(".category");

// Unsplash config
const UNSPLASH_BASE_URL = "https://api.unsplash.com";
const UNSPLASH_ACCESS_KEY = "qEJS3_uc9Y5N_fd5ia0YQxM3hkwg7PrjfSphgZ3aJvo";

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

// Without ImageKit
function createImageCardWithoutImageKit(photo) {
  const imgCard = document.createElement("div");
  imgCard.classList.add("image-card");

  const imgEle = document.createElement("img");
  const rawUrl = photo.urls.raw;
  imgEle.src = rawUrl;
  imgEle.alt = photo.alt_description || "Unsplash image";

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const photographer = document.createElement("div");
  photographer.classList.add("photographer");

  const downloadBtn = document.createElement("button");
  downloadBtn.classList.add("download-btn");
  downloadBtn.textContent = "⬇️";

  const downloadUrl = photo.links && photo.links.download;

  if (downloadUrl) {
    downloadBtn.addEventListener("click", () => {
      window.open(downloadUrl, "_blank");
    });
  }

  overlay.append(photographer, downloadBtn);
  imgCard.append(overlay, imgEle);

  return imgCard;
}

/* -------------------------------------------------------
   Added: Network based optimization helpers
   Goal: pick a "quality" value based on user's connection
------------------------------------------------------- */

function getNetworkInfo() {
  // Works on Chromium browsers and some Android browsers
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  //console.log(connection);

  return {
    connection,
    effectiveType: connection?.effectiveType || "unknown", // slow-2g, 2g, 3g, 4g
    downlink:
      typeof connection?.downlink === "number" ? connection.downlink : null, // Mbps
    saveData: !!connection?.saveData,
  };
}

function chooseImageQuality() {
  const { effectiveType, downlink, saveData } = getNetworkInfo();

  // If user enabled Data Saver, always go low
  if (saveData) return 35;

  // If downlink is present, it is a better signal than effectiveType
  // if (typeof downlink === "number") {
  //   if (downlink < 1) return 35; // very slow
  //   if (downlink < 2.5) return 50; // slow
  //   if (downlink < 5) return 65; // ok
  //   return 75; // fast
  // }

  // Fallback: use effectiveType
  if (effectiveType === "slow-2g") return 30;
  if (effectiveType === "2g") return 35;
  if (effectiveType === "3g") return 55;
  if (effectiveType === "4g") return 75;

  // Unknown connection
  return 70;
}

/* -------------------------------------------------------
   Added: Lazy loading using IntersectionObserver
   Goal: load a tiny placeholder first, swap real image near viewport
------------------------------------------------------- */

const lazyLoadObserverOptions = {
  root: null, // viewport
  rootMargin: "300px 0px 300px 0px", // start loading before it appears
  threshold: 0.01,
};

let lazyImageObserver = null;

function getLazyImageObserver() {
  // Create it only once
  if (lazyImageObserver) return lazyImageObserver;

  lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const imgElement = entry.target;

      // Swap in real ImageKit responsive attributes
      const realSrc = imgElement.dataset.src;
      const realSrcSet = imgElement.dataset.srcset;
      const realSizes = imgElement.dataset.sizes;

      if (realSrc) imgElement.src = realSrc;
      if (realSrcSet) imgElement.setAttribute("srcset", realSrcSet);
      if (realSizes) imgElement.setAttribute("sizes", realSizes);

      // Stop observing once loaded
      observer.unobserve(imgElement);
    });
  }, lazyLoadObserverOptions);

  return lazyImageObserver;
}

function observeImageForLazyLoad(imgElement) {
  const observer = getLazyImageObserver();
  observer.observe(imgElement);
}

// Create a single image card element from a photo object which is using responsive images from ImageKit
function createImageCardWithImageKit(photo) {
  //console.log(photo);

  // Added: choose quality based on network
  const selectedQuality = chooseImageQuality();

  // Added: low quality placeholder (very small and blurred)
  const placeholderUrl = ImageKit.buildSrc({
    urlEndpoint: "https://ik.imagekit.io/Kashish12345/app",
    src: `/${photo.urls.raw}`,
    transformation: [
      { width: 40 },
      { quality: 10 },
      { blur: 30 },
      { format: "auto" },
    ],
  });

  // Added: responsive ImageKit attributes, with network based quality
  const getResponsiveImageTagsWidth = () => {
    const responsiveImageTags = ImageKit.getResponsiveImageAttributes({
      src: `/${photo.urls.raw}`,
      urlEndpoint: "https://ik.imagekit.io/Kashish12345/app",
      sizes: "(max-width: 739px) 50vw, 33vw",
      transformation: [{ quality: selectedQuality }, { format: "auto" }],
    });
    //console.log(responsiveImageTags);
    return responsiveImageTags;
  };

  const imgCard = document.createElement("div");
  imgCard.classList.add("image-card");

  const imgEle = document.createElement("img");

  // Get src, srcset, sizes from ImageKit
  const responsiveAttrs = getResponsiveImageTagsWidth();

  // Important: we do NOT set the real src/srcset immediately
  // We set a placeholder now, and store real values in data attributes
  imgEle.src = placeholderUrl;

  if (responsiveAttrs && responsiveAttrs.src) {
    imgEle.dataset.src = responsiveAttrs.src;
  } else {
    imgEle.dataset.src = photo.urls.raw; // fallback
  }

  if (responsiveAttrs && responsiveAttrs.srcSet) {
    imgEle.dataset.srcset = responsiveAttrs.srcSet;
  }

  if (responsiveAttrs && responsiveAttrs.sizes) {
    imgEle.dataset.sizes = responsiveAttrs.sizes;
  }

  // Start observing this image for lazy load swap
  observeImageForLazyLoad(imgEle);

  imgEle.alt = photo.alt_description || "Unsplash image";

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const photographer = document.createElement("div");
  photographer.classList.add("photographer");

  const downloadBtn = document.createElement("button");
  downloadBtn.classList.add("download-btn");
  downloadBtn.textContent = "⬇️";

  const downloadUrl = photo.links && photo.links.download;
  if (downloadUrl) {
    downloadBtn.addEventListener("click", () => {
      window.open(downloadUrl, "_blank");
    });
  }

  overlay.append(photographer, downloadBtn);
  imgCard.append(overlay, imgEle);

  return imgCard;
}

// Fetch photos from Unsplash and render them
async function fetchAndRenderPhotos(url, { isSearchEndpoint = false } = {}) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const photos = isSearchEndpoint ? data.results : data;

    imgSection.innerHTML = "";

    for (const photo of photos) {
      const card = createImageCardWithImageKit(photo);
      imgSection.append(card);
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
    imgSection.innerHTML = "<p>Something went wrong while loading images.</p>";
  }
}

/* -------------------------------------------------------
   Initial random images on first load
------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const url = `${UNSPLASH_BASE_URL}/photos/random?count=50&client_id=${UNSPLASH_ACCESS_KEY}`;
  fetchAndRenderPhotos(url, { isSearchEndpoint: false });
});

/* -------------------------------------------------------
   Category bar
------------------------------------------------------- */

categoryButtons.forEach((categoryBtn) => {
  categoryBtn.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    categoryBtn.classList.add("active");

    const categoryText = categoryBtn.innerText.trim();

    const url = `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(
      categoryText
    )}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`;

    fetchAndRenderPhotos(url, { isSearchEndpoint: true });
  });
});

/* -------------------------------------------------------
   Added: Optional, re-render when network changes
   This helps show the demo when you throttle in DevTools
------------------------------------------------------- */

(function listenToNetworkChangesForDemo() {
  const { connection } = getNetworkInfo();
  if (!connection || !connection.addEventListener) return;

  let debounceTimer = null;

  connection.addEventListener("change", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      // If category active, re-run that search, else reload random feed
      const activeCategory = document.querySelector(".category.active");

      if (activeCategory) {
        const categoryText = activeCategory.innerText.trim();
        const url = `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(
          categoryText
        )}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`;

        fetchAndRenderPhotos(url, { isSearchEndpoint: true });
      } else {
        const url = `${UNSPLASH_BASE_URL}/photos/random?count=50&client_id=${UNSPLASH_ACCESS_KEY}`;
        fetchAndRenderPhotos(url, { isSearchEndpoint: false });
      }
    }, 400);
  });
})();
