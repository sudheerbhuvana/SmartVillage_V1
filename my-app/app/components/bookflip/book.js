import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip'; // Ensure this library is correctly installed
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'; // Firebase imports

const FlipBookComponent = () => {
  const [images, setImages] = useState([]); // Store all image URLs
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage();
        const listRef = ref(storage, 'BookFlip'); // Update the path as needed

        // Fetch all image references from Firebase
        const response = await listAll(listRef);

        // Sort by filenames before getting URLs
        const sortedItems = response.items.sort((a, b) => {
          const aPageNumber = parseInt(a.name.match(/(\d+)\.(jpg|png|jpeg)$/)?.[1], 10);
          const bPageNumber = parseInt(b.name.match(/(\d+)\.(jpg|png|jpeg)$/)?.[1], 10);

          return aPageNumber - bPageNumber;
        });

        // Fetch URLs for all images
        const imageUrls = await Promise.all(
          sortedItems.map((item) => getDownloadURL(item))
        );

        setImages(imageUrls);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images from Firebase:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div className="home-eight-one-in-book">
      <HTMLFlipBook
        className='flipbook-main'
        width={window.innerWidth < 768 ? 300 : 600} // Responsive width for mobile
        height={window.innerWidth < 768 ? 400 : 800} // Responsive height for mobile
        size="stretch"
        minWidth={300}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        showCover={true}
        mobileScrollSupport={true}
        useMouseEvents={true} // Enable mouse scroll for flipping
      >
        {images.map((imageUrl, index) => (
          <div className="flipbook-page" key={index}>
            <img src={imageUrl} alt={`Page ${index + 1}`} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default FlipBookComponent;
