import React from "react";

const GallerySection: React.FC = () => {
  // Gallery images
  const images = [
    {
      src: "/Partner with The Dink_files/66f87bbd.jpg",
      alt: "We've live-streamed the Major League Pickleball draft",
    },
    {
      src: "/Partner with The Dink_files/7b8e8c6e.jpg",
      alt: "We've given away a pickleball facility with Katy Perry",
    },
    {
      src: "/Partner with The Dink_files/e95ea067.jpg",
      alt: "We've crashed NBC news",
    },
  ];

  return (
    <div
      id="gallery06"
      className="w-full bg-gray-100 py-12 flex justify-center"
    >
      <div className="max-w-6xl w-full px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
