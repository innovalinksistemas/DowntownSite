'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rooms, setRooms] = useState([]);
  
  // Función para obtener las habitaciones desde el JSON
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch('https://raw.githubusercontent.com/WdSevilla/Downtown/refs/heads/main/public/rooms.json'); 
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length);
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + rooms.length) % rooms.length;
      visibleImages.push(rooms[index]);
    }
    return visibleImages;
  };

  if (rooms.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden">
        <div className="flex pb-8 pt-8 justify-center transition-transform duration-500 ease-in-out">
          {getVisibleImages().map((room, index) => {
            const isActive = index === 1; // La imagen del medio es la activa
            return (
              <div
                key={room.id}
                className={`transition-all duration-500 transform mx-4 ${
                  isActive ? 'scale-105 opacity-100' : 'scale-90 opacity-50'
                } ${
                  index === 0 || index === 2 ? 'hidden md:block' : ''
                }`} // Ocultar imágenes laterales en pantallas móviles
                style={{
                  width: isActive ? '170%' : '100%',
                  filter: isActive ? 'none' : 'brightness(50%)',
                  transition: 'transform 0.5s, opacity 0.5s',
                }}
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="object-cover h-96 sm:w-[38rem] sm:h-[30rem] rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex flex-col justify-end text-left pl-12 pb-4">  
                  <p className="text-white font-Montserrat text-xl">FROM {room.price}</p>
                  <p className="text-white font-Montserrat text-xl font-semibold">{room.title}</p>
                  <div className="flex text-white space-x-2">
                    <img src="https://i.ibb.co/mv32YLD/person.png" alt="person" className="w-6 h-6" />
                    <p className="font-Montserrat">{room.sleeps} Sleeps</p>
                    <img src="https://i.ibb.co/F4Tzpqs/bed.png" alt="bed" className="w-6 h-6" />
                    <p className="font-Montserrat">{room.beds}</p>
                  </div>
                  <div>
                    <button className="text-yellow-400 font-medium underline text-lg rounded-md font-Montserrat">
                      See availability ➔
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Imágenes anteriores"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Siguientes imágenes"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
  
    </div>
  );
}
