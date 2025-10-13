'use client';

interface GalleryImageProps {
  image: {
    id: string;
    url: string;
    name?: string;
  };
  index: number;
}

export default function GalleryImage({ image, index }: GalleryImageProps) {
  const handleClick = () => {
    window.open(image.url, '_blank');
  };

  return (
    <img
      key={image.id}
      src={image.url}
      alt={image.name || `Gallery image ${index + 1}`}
      className='rounded-lg object-cover h-48 w-full cursor-pointer hover:opacity-90 transition-opacity'
      onClick={handleClick}
    />
  );
}
