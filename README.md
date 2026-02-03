# MediaLab

A comprehensive demo application showcasing modern image optimization and video streaming techniques for the web. Built to demonstrate performance best practices using [ImageKit](https://imagekit.io/) for media delivery.

## Table of Contents

- [Features](#features)
- [Demo Sections](#demo-sections)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technical Implementation](#technical-implementation)
- [API Configuration](#api-configuration)
- [Resources & Documentation](#resources--documentation)

---

## Features

### Image Optimization
- **Network-adaptive quality** - Adjusts image quality based on connection speed
- **Responsive images** - Serves appropriately sized images for different viewports
- **Lazy loading** - Defers off-screen image loading for faster initial page load
- **LQIP (Low Quality Image Placeholders)** - Shows blurred thumbnails while full images load
- **Auto format** - Serves WebP/AVIF where supported

### Video Streaming
- **Progressive streaming** - Standard MP4 delivery with fixed resolution
- **Adaptive bitrate streaming (HLS)** - Dynamic quality switching based on bandwidth
- **InstaStream** - Instagram-style autoplay on scroll using IntersectionObserver

---

## Demo Sections

| Page | Description | Key Technologies |
|------|-------------|------------------|
| **Image Optimization** | Photo gallery with network-aware loading | ImageKit responsive images, IntersectionObserver |
| **Progressive Stream** | Fixed-resolution video delivery | Native HTML5 video, ImageKit transformations |
| **Adaptive Stream** | HLS streaming with quality selector | Video.js, HLS.js, ImageKit ABS |
| **InstaStream** | Autoplay videos on scroll | IntersectionObserver, native video |

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- [Unsplash API key](https://unsplash.com/developers) for images
- [ImageKit account](https://imagekit.io/) with configured URL endpoint

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MediaLab.git
   cd MediaLab
   ```

2. **Configure API keys**
   ```bash
   cp config.example.js config.js
   ```

   Edit `config.js` and add your Unsplash API key:
   ```javascript
   const CONFIG = {
     UNSPLASH_BASE_URL: "https://api.unsplash.com",
     UNSPLASH_ACCESS_KEY: "your-unsplash-access-key-here",
   };
   ```

3. **Open in browser**

   Open `index.html` directly in your browser, or use a local server:
   ```bash
   npx serve .
   ```

---

## Project Structure

```
MediaLab/
├── index.html          # Image optimization demo
├── videoPS.html        # Progressive streaming demo
├── videoABS.html       # Adaptive bitrate streaming demo
├── videoIS.html        # InstaStream (autoplay on scroll) demo
├── styles.css          # Shared styles
├── script.js           # Image optimization logic
├── videoPS.js          # Progressive streaming logic
├── videoABS.js         # Adaptive streaming logic (Video.js + HLS)
├── videoIS.js          # InstaStream logic (IntersectionObserver)
├── config.js           # API keys (gitignored)
├── config.example.js   # API keys template
└── README.md
```

---

## Technical Implementation

### Image Optimization (`script.js`)

#### Network Information API
Detects user's connection type to serve appropriate image quality.

```javascript
const connection = navigator.connection || navigator.mozConnection;
const effectiveType = connection?.effectiveType; // "slow-2g", "2g", "3g", "4g"
```

**Resources:**
- [MDN: Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
- [MDN: NetworkInformation.effectiveType](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)

#### IntersectionObserver for Lazy Loading
Loads images only when they approach the viewport.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Load the real image
      imgElement.src = imgElement.dataset.src;
    }
  });
}, { rootMargin: "300px" });
```

**Resources:**
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [MDN: Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)

#### ImageKit Responsive Images
Generates `srcset` and `sizes` attributes for responsive delivery.

```javascript
ImageKit.getResponsiveImageAttributes({
  src: "/image.jpg",
  urlEndpoint: "https://ik.imagekit.io/your_id",
  sizes: "(max-width: 739px) 50vw, 33vw",
  transformation: [{ quality: 75 }, { format: "auto" }],
});
```

**Resources:**
- [ImageKit: Responsive Images](https://imagekit.io/docs/responsive-images)
- [ImageKit: JavaScript SDK](https://imagekit.io/docs/integration/javascript)
- [MDN: Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

---

### Progressive Streaming (`videoPS.js`)

Standard MP4 delivery with ImageKit transformations for resizing.

```javascript
const tr = ImageKit.buildTransformationString([{ width: 1280, height: 720 }]);

ImageKit.buildSrc({
  urlEndpoint: IK_URL_ENDPOINT,
  src: `/${sourceUrl}`,
  queryParameters: { tr },
});
```

**Resources:**
- [ImageKit: Video Transformation](https://imagekit.io/docs/video-transformation)
- [ImageKit: Resize Videos](https://imagekit.io/docs/video-transformation#basic-video-resizing)
- [MDN: HTML Video Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

---

### Adaptive Bitrate Streaming (`videoABS.js`)

HLS streaming with multiple quality levels using Video.js.

```javascript
// Build HLS URL with ImageKit
const tr = ImageKit.buildTransformationString([
  { streamingResolutions: [240, 360, 480, 720, 1080] },
]);

ImageKit.buildSrc({
  urlEndpoint: IK_URL_ENDPOINT,
  src: `/${sourceUrl}/ik-master.m3u8`,
  queryParameters: { tr },
});
```

#### Video.js Configuration
```javascript
videojs(videoEl, {
  html5: {
    vhs: {
      overrideNative: true,
      limitRenditionByPlayerDimensions: true,
      enableLowInitialPlaylist: true,
      experimentalBufferBasedABR: true,
    },
  },
});
```

**Resources:**
- [ImageKit: Adaptive Bitrate Streaming](https://imagekit.io/docs/adaptive-bitrate-streaming)
- [ImageKit: HLS Streaming](https://imagekit.io/docs/adaptive-bitrate-streaming#hls-streaming)
- [Video.js Documentation](https://videojs.com/guides/)
- [Video.js HTTP Source Selector](https://github.com/jfujita/videojs-http-source-selector)
- [MDN: Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)

---

### InstaStream (`videoIS.js`)

Instagram-style autoplay using IntersectionObserver.

```javascript
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, { threshold: 0.6 });
```

**Key attributes for autoplay:**
```javascript
videoEl.muted = true;      // Required for autoplay
videoEl.loop = true;       // Continuous playback
videoEl.playsInline = true; // iOS compatibility
```

**Resources:**
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [MDN: Autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide)
- [MDN: HTMLMediaElement.play()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)

---

## API Configuration

### Unsplash API
Used for fetching sample images. [Get your API key](https://unsplash.com/developers).

### ImageKit
Used for image/video transformations and delivery. Features used:

| Feature | Documentation |
|---------|---------------|
| URL Endpoint | [ImageKit: URL Endpoints](https://imagekit.io/docs/url-endpoints) |
| Image Transformations | [ImageKit: Transformations](https://imagekit.io/docs/transformations) |
| Responsive Images | [ImageKit: Responsive Images](https://imagekit.io/docs/responsive-images) |
| Video Transformations | [ImageKit: Video Transformation](https://imagekit.io/docs/video-transformation) |
| Adaptive Streaming | [ImageKit: ABS](https://imagekit.io/docs/adaptive-bitrate-streaming) |
| JavaScript SDK | [ImageKit: JS SDK](https://imagekit.io/docs/integration/javascript) |

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Network Information API | Yes | No | No | Yes |
| IntersectionObserver | Yes | Yes | Yes | Yes |
| HLS (native) | No | No | Yes | No |
| HLS (via Video.js) | Yes | Yes | Yes | Yes |

---

## License

This project is for demonstration purposes. Sample videos are from [Google's sample video library](https://goo.gl/vrqWbA) under Creative Commons.

---

## Author

Developed by **Ashish**

---

## Acknowledgments

- [Unsplash](https://unsplash.com/) for the image API
- [ImageKit](https://imagekit.io/) for media optimization and delivery
- [Video.js](https://videojs.com/) for the video player
- [Blender Foundation](https://www.blender.org/) for sample videos







   

   



