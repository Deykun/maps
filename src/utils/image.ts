export const getImageSrcSet = (
  imagesList: {
    width: string;
    path: string;
  }[] = []
) => {
  return imagesList.map(({ path, width }) => `${path} ${width}`).join(',')
}