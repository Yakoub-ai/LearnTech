/**
 * YouTube Utilities
 * Functions for handling YouTube URLs, thumbnails, and video extraction
 */

/**
 * Extract YouTube video ID from various YouTube URL formats
 * Supports:
 * - youtube.com/watch?v=VIDEO_ID
 * - youtu.be/VIDEO_ID
 * - youtube.com/embed/VIDEO_ID
 * - youtube.com/v/VIDEO_ID
 *
 * @param {string} url - The YouTube URL to extract ID from
 * @returns {string|null} The video ID, or null if not a valid YouTube URL
 */
export function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  // Pattern 1: youtube.com/watch?v=VIDEO_ID
  let match = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/.*[?&]v=)([^&\n?#]+)/i);
  if (match && match[1]) {
    return match[1];
  }

  // Pattern 2: youtu.be/VIDEO_ID
  match = url.match(/youtu\.be\/([^?&\n#]+)/i);
  if (match && match[1]) {
    return match[1];
  }

  // Pattern 3: youtube.com/embed/VIDEO_ID
  match = url.match(/youtube\.com\/embed\/([^?&\n#]+)/i);
  if (match && match[1]) {
    return match[1];
  }

  // Pattern 4: youtube.com/v/VIDEO_ID
  match = url.match(/youtube\.com\/v\/([^?&\n#]+)/i);
  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Get YouTube thumbnail URL for a given video ID
 * Returns the highest quality thumbnail available
 *
 * @param {string} videoId - The YouTube video ID
 * @param {string} quality - Quality level: 'maxres' (default), 'sddefault', 'hqdefault', 'mqdefault', 'default'
 * @returns {string} URL to the thumbnail image
 */
export function getYouTubeThumbnail(videoId, quality = 'hqdefault') {
  if (!videoId) {
    return '';
  }

  const validQualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  const resolved = validQualities.includes(quality) ? quality : 'mqdefault';

  return `https://img.youtube.com/vi/${videoId}/${resolved}`;
}

/**
 * Get YouTube embed URL for a given video ID
 * Can optionally start at a specific timestamp
 *
 * @param {string} videoId - The YouTube video ID
 * @param {number} startTime - Optional start time in seconds
 * @param {boolean} allowFullscreen - Allow fullscreen embed (default: true)
 * @returns {string} URL for embedding in an iframe
 */
export function getYouTubeEmbedUrl(videoId, startTime = 0, allowFullscreen = true) {
  if (!videoId) {
    return '';
  }

  let url = `https://www.youtube.com/embed/${videoId}`;

  const params = [];

  if (startTime > 0) {
    params.push(`start=${Math.floor(startTime)}`);
  }

  if (!allowFullscreen) {
    params.push('fs=0');
  }

  // Add common embed parameters for better UX
  params.push('rel=0'); // Don't show related videos from other channels
  params.push('modestbranding=1'); // Minimal YouTube branding

  if (params.length > 0) {
    url += '?' + params.join('&');
  }

  return url;
}

/**
 * Extract all YouTube videos from markdown content
 * Finds all YouTube links and extracts video information
 *
 * @param {string} markdown - The markdown content to search
 * @returns {Array<{title: string, videoId: string, url: string, startTime: number}>} Array of videos found
 */
export function extractVideosFromMarkdown(markdown) {
  const videos = [];

  if (!markdown || typeof markdown !== 'string') {
    return videos;
  }

  // Match markdown links with YouTube URLs: [title](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+(?:youtube|youtu\.be)[^)]*)\)/gi;

  let match;
  while ((match = linkPattern.exec(markdown)) !== null) {
    const title = match[1];
    const url = match[2];

    const videoId = extractYouTubeId(url);

    if (videoId) {
      // Try to extract start time from URL if present
      let startTime = 0;
      const timeMatch = url.match(/[?&]t=(\d+)/i);
      if (timeMatch) {
        startTime = parseInt(timeMatch[1], 10);
      }

      videos.push({
        title,
        videoId,
        url,
        startTime
      });
    }
  }

  return videos;
}

/**
 * Validate if a URL is a valid YouTube URL
 *
 * @param {string} url - The URL to validate
 * @returns {boolean} True if the URL is a valid YouTube URL
 */
export function isValidYouTubeUrl(url) {
  return extractYouTubeId(url) !== null;
}

/**
 * Create a YouTube watch URL from a video ID
 * Optionally include timestamp and other parameters
 *
 * @param {string} videoId - The YouTube video ID
 * @param {number} startTime - Optional start time in seconds
 * @param {string} listId - Optional playlist ID to include
 * @returns {string} Full YouTube watch URL
 */
export function createYouTubeWatchUrl(videoId, startTime = 0, listId = null) {
  if (!videoId) {
    return '';
  }

  const params = [];

  params.push(`v=${videoId}`);

  if (startTime > 0) {
    params.push(`t=${Math.floor(startTime)}s`);
  }

  if (listId) {
    params.push(`list=${listId}`);
  }

  return `https://www.youtube.com/watch?${params.join('&')}`;
}

/**
 * Format duration (seconds) to readable string
 * Useful for displaying video duration
 *
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration like "1:23:45" or "23:45"
 */
export function formatDuration(seconds) {
  if (!seconds || seconds < 0) {
    return '0:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];

  if (hours > 0) {
    parts.push(hours.toString());
  }

  parts.push(minutes.toString().padStart(2, '0'));
  parts.push(secs.toString().padStart(2, '0'));

  return parts.join(':');
}

/**
 * Get video information for embedding
 * Combines video ID extraction, embed URL generation, and thumbnail
 *
 * @param {string} url - The YouTube URL
 * @param {number} startTime - Optional start time in seconds
 * @returns {object|null} Object with {videoId, embedUrl, thumbnailUrl} or null if invalid URL
 */
export function getVideoEmbedInfo(url, startTime = 0) {
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return null;
  }

  return {
    videoId,
    url,
    embedUrl: getYouTubeEmbedUrl(videoId, startTime),
    thumbnailUrl: getYouTubeThumbnail(videoId),
    watchUrl: createYouTubeWatchUrl(videoId, startTime)
  };
}
