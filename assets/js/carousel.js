// Video Carousel Logic for Resources Page

// Video Data Array - Add or remove videos here
const videoData = [
  { id: "hpfMO7Bp5zA", title: "ADHD Video 1" },
  { id: "S9kAohMS1Cs", title: "ADHD Video 2" },
  { id: "5tPjjjgPF_4", title: "ADHD Video 3" },
  { id: "igtbxx52wII", title: "ADHD Video 4" },
  { id: "3kxWWqSxZ1k", title: "ADHD Video 5" }
];

class VideoCarousel {
  constructor(containerSelector, videos) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.error(`Carousel container "${containerSelector}" not found`);
      return;
    }
    
    if (!videos?.length) {
      console.warn('No videos provided to carousel');
      return;
    }
    
    this.videoData = videos;
    this.totalVideos = videos.length;
    this.currentVideoIndex = Math.floor(this.totalVideos / 2);
    
    // Configuration for video positioning
    this.config = {
      activeScale: 1,
      adjacentScale: 0.7,
      hiddenScale: 0.5,
      activeOpacity: 1,
      adjacentOpacity: 0.3,
      hiddenOpacity: 0,
      adjacentOffset: 65,
      hiddenOffset: 100,
      transition: 'all 0.5s ease'
    };
    
    this.generateVideos();
    this.videos = Array.from(this.container.querySelectorAll('[id^="video-"]'));
    this.updateAllVideos();
  }
  
  getRelativePosition(index) {
    return (index - this.currentVideoIndex + this.totalVideos) % this.totalVideos;
  }
  
  getVideoStyles(relativePosition) {
    const baseStyles = {
      width: '100%',
      top: '0',
      left: '50%',
      position: 'absolute',
      transition: this.config.transition
    };
    
    const { adjacentScale, hiddenScale, activeOpacity, adjacentOpacity, hiddenOpacity, adjacentOffset, hiddenOffset } = this.config;
    
    // Active center video
    if (relativePosition === 0) {
      return {
        ...baseStyles,
        transform: 'translateX(-50%)',
        opacity: activeOpacity,
        zIndex: 10,
        pointerEvents: 'auto'
      };
    }
    
    // Adjacent videos (left and right)
    if (relativePosition === 1 || relativePosition === this.totalVideos - 1) {
      const direction = relativePosition === 1 ? '' : '-';
      return {
        ...baseStyles,
        transform: `translateX(-50%) scale(${adjacentScale}) translateX(${direction}${adjacentOffset}%)`,
        opacity: adjacentOpacity,
        zIndex: 1,
        pointerEvents: 'none'
      };
    }
    
    // Hidden videos
    const direction = relativePosition < this.totalVideos / 2 ? '' : '-';
    return {
      ...baseStyles,
      transform: `translateX(-50%) scale(${hiddenScale}) translateX(${direction}${hiddenOffset}%)`,
      opacity: hiddenOpacity,
      zIndex: 0,
      pointerEvents: 'none'
    };
  }
  
  createVideoElement(videoInfo, index) {
    const relativePosition = this.getRelativePosition(index);
    const isActive = relativePosition === 0;
    
    const videoWrapper = document.createElement('div');
    videoWrapper.id = `video-${index}`;
    videoWrapper.className = 'position-absolute';
    Object.assign(videoWrapper.style, this.getVideoStyles(relativePosition));
    
    const innerContainer = document.createElement('div');
    innerContainer.style.cssText = `
      position: relative;
      width: 100%;
      padding-bottom: 177.78%;
      background-color: #000;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: ${isActive ? '0 8px 12px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
      ${!isActive ? 'pointer-events: none;' : ''}
    `;
    
    const iframe = document.createElement('iframe');
    Object.assign(iframe, {
      src: `https://www.youtube.com/embed/${videoInfo.id}`,
      title: videoInfo.title,
      frameBorder: "0",
      allowFullscreen: true
    });
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
    
    innerContainer.appendChild(iframe);
    videoWrapper.appendChild(innerContainer);
    return videoWrapper;
  }
  
  generateVideos() {
    this.container.innerHTML = '';
    
    const paddingDiv = document.createElement('div');
    paddingDiv.style.cssText = 'padding-bottom: 177.78%; position: relative';
    this.container.appendChild(paddingDiv);
    
    this.videoData.forEach((videoInfo, index) => {
      this.container.appendChild(this.createVideoElement(videoInfo, index));
    });
  }
  
  updateAllVideos() {
    this.videos.forEach((video, index) => {
      const styles = this.getVideoStyles(this.getRelativePosition(index));
      Object.assign(video.style, styles);
    });
  }
  
  changeVideo(direction) {
    this.currentVideoIndex = (this.currentVideoIndex + direction + this.totalVideos) % this.totalVideos;
    this.updateAllVideos();
  }
}

// Initialize carousel when DOM is ready
let carousel;

document.addEventListener('DOMContentLoaded', () => {
  const selector = '.position-relative.mx-auto[style*="max-width: 18.75rem"]';
  if (document.querySelector(selector)) {
    carousel = new VideoCarousel(selector, videoData);
  }
});

// Global function for button onclick handlers
function changeVideo(direction) {
  carousel?.changeVideo(direction);
}
