const getImageOrFallbackUrl = (imageUrl) => {
  if (!imageUrl) {
    return process.env.REACT_APP_FALLBACK_IMAGE_URL;
  }

  return `https://image.tmdb.org/t/p/w500/${imageUrl}`;
};

export default getImageOrFallbackUrl;
