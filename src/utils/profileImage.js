export const getProfileDisplay = (user) => {
  // Check if user has a valid image URL in about field
  const hasValidImageUrl = user?.about && 
    (user.about.startsWith('http') || user.about.startsWith('/'));

  return {
    isImage: hasValidImageUrl,
    src: hasValidImageUrl ? user.about : null
  };
}; 