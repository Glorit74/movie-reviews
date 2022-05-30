const getImageOrFallbackUrl = (imageUrl) => {
  if (!imageUrl) {
    return process.env.REACT_APP_FALLBACK_IMAGE_URL;
  }

  return imageUrl;
};

export default getImageOrFallbackUrl;
