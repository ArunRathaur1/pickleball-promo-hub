export default function TrustedBrands() {
  const brands = [
    { src: "/images/6fe524de.jpg", alt: "Lifeaid" },
    { src: "/images/05fd3661.jpg", alt: "Organifi" },
    { src: "/images/3fa53155.jpg", alt: "Vuori" },
    { src: "/images/ea142f4b.png", alt: "Franklin Pickleball" },
    { src: "/images/c159c86c.jpg", alt: "LMNT" },
    { src: "/images/b7e1e45a.jpg", alt: "Kswiss" },
    { src: "/images/0932500a.jpg", alt: "Amazon Pharmacy" },
    { src: "/images/651b10a8.png", alt: "Head Pickleball" },
    { src: "/images/6fe81811.jpg", alt: "Adidas" },
    { src: "/images/1499c763.png", alt: "Selkirk" },
    { src: "/images/900a0000.png", alt: "OS1st" },
    { src: "/images/e389cc08.jpg", alt: "Nike" },
    { src: "/images/05a8a827.jpg", alt: "Brooklinen" },
    { src: "/images/09d79c7f.png", alt: "Babolat" },
    { src: "/images/b546c824.jpg", alt: "MorningBrew" },
    { src: "/images/5b3d9239.png", alt: "Vint" },
    { src: "/images/f05811f1.jpg", alt: "Manscaped" },
    { src: "/images/7adf9438.jpg", alt: "Therabody" },
  ];

  return (
    <div className="bg-gray-900 text-white py-16 px-6 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10 text-center">
        Trusted by Top Brands
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center justify-center"
          >
            <img
              src={brand.src}
              alt={brand.alt}
              className="max-w-[120px] max-h-[80px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
