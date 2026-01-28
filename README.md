# MediaLab  
Image and Video Optimization Demo

## Overview

MediaLab is a front end demonstration project built to showcase modern image optimization and video streaming techniques for the web. The goal of this project is to demonstrate how optimized media delivery improves performance, quality, and user experience across different network conditions and devices.

This project focuses on real world use cases using ImageKit for media optimization and streaming, along with browser native APIs and modern video playback strategies.

---

## Features Demonstrated

### Image Optimization

This project demonstrates the following image optimization techniques:

1. Responsive images using the ImageKit JavaScript SDK  
   Images automatically adapt to different screen sizes and resolutions to ensure optimal delivery across devices.

2. Automatic format selection and compression using ImageKit  
   Images are delivered in the most efficient format supported by the browser with intelligent compression applied.

3. Lazy loading using the Intersection Observer API  
   Images are loaded only when they enter the viewport, reducing initial page load time and unnecessary network usage.

4. Network based image optimization using the Network Information API  
   Image quality and delivery behavior adapt based on the user’s network conditions such as effective connection type.

5. Image source integration using the Unsplash API  
   Images are dynamically fetched from the Unsplash API and optimized on delivery.

---

## Video Streaming

### Progressive Streaming

The progressive streaming demo highlights the following capabilities:

1. Progressive video playback  
   Videos start playing as data is downloaded without waiting for the full file.

2. Format and compression optimization using ImageKit  
   Video assets are optimized for size and delivery efficiency.

3. Preloading using the native video preload attribute  
   Improves perceived playback speed and reduces buffering delays.

---

### Adaptive Streaming

The adaptive streaming demo showcases adaptive bitrate streaming using HLS.

#### HLS Adaptive Bitrate Streaming

1. Adaptive bitrate streaming using HLS  
   Video quality dynamically adjusts based on available bandwidth and device capabilities.

2. Video.js integration for playback  
   Video.js is used to manage HLS playback and adaptive behavior.

3. Advanced Video.js VHS configuration  
   The following Video.js VHS settings are used to optimize adaptive streaming behavior:
   vhs: {
overrideNative: true,
limitRenditionByPlayerDimensions: true,
useDevicePixelRatio: true,
enableLowInitialPlaylist: true,
goalBufferLength: 15,
bufferLowWaterLine: 5,
bufferHighWaterLine: 30,
experimentalBufferBasedABR: true
}


These settings help balance startup time, buffering behavior, and visual quality.

4. Video preload configuration using Video.js  
Ensures smoother startup and improved playback experience.

---

## Tools and Technologies Used

1. ImageKit JavaScript SDK  
2. ImageKit media optimization and streaming  
3. Unsplash API for image sourcing  
4. Intersection Observer API  
5. Network Information API  
6. HTML5 video element  
7. Video.js with VHS for HLS playback  

---

## Purpose of This Project

This project is intended to:

1. Demonstrate practical image and video optimization techniques  
2. Compare progressive and adaptive streaming approaches  
3. Showcase how ImageKit can be used for modern media delivery  
4. Serve as a reference implementation for developers  

---

## Live Demo

Explore the live demo here:  
http://kashish-dev-101.github.io/MediaLab


