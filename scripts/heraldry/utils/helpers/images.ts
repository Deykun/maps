export const getImageFromThumbnailUrl = (imageUrlToCheck: string) => {
  // https://stackoverflow.com/a/33691240/6743808
  /*
    https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/200px-Tour_Eiffel_Wikimedia_Commons.jpg

    The first part is always the same: https://upload.wikimedia.org/wikipedia/commons/thumb
    The second part is the first character of the MD5 hash of the file name. In this case, the MD5 hash of Tour_Eiffel_Wikimedia_Commons.jpg is a85d416ee427dfaee44b9248229a9cdd, so we get /a.
    The third part is the first two characters of the MD5 hash from above: /a8.
    The fourth part is the file name: /Tour_Eiffel_Wikimedia_Commons.jpg
    The last part is the desired thumbnail width, and the file name again: /200px-Tour_Eiffel_Wikimedia_Commons.jpg
  */

  if (imageUrlToCheck.includes('/thumb/')) {
    let imageUrl = imageUrlToCheck.replace('/thumb/', '/');

    imageUrl = imageUrl.split('/').slice(0, -1).join('/');
  
    return imageUrl;
  }

  return imageUrlToCheck;
};
