'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rooms, setRooms] = useState([]);

  // Función para obtener las habitaciones desde el JSON
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch('/Downtown/rooms.json');
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
        <div className="flex lg:justify-left justify-right transition-transform duration-500 ease-in-out">
          {getVisibleImages().map((room, index) => {
            const isActive = index === 1;
            return (
              <div
                key={room.id}
                className={`transition-all duration-500 transform mx-4 ${isActive ? 'scale-105 opacity-100' : 'scale-90 opacity-50'
                  } ${index === 0 || index === 2 ? 'hidden md:hidden' : ''
                  }`}

              >
                <div className="flex flex-col md:flex-row lg:gap-2 gap-6 items-center md:items-start p-4 md:pl-20">

                  <div className="w-full md:w-2/3 mt-2 lg:mt-0">
                    <img
                      src={room.image}
                      alt="Habitaciones Downtown"
                      className="object-cover lg:w-[46rem] lg:h-100 w-[21rem] md:h-[28rem] rounded"
                    />

                    <div className="flex w-full lg:grid lg:grid-cols-3 gap-4 mt-4 ">
                      <img
                        src={room.image2}
                        alt="Habitaciones Downtown"
                        className="object-cover lg:w-[14rem] lg:h-[9rem] w-[7rem] h-28   rounded  "
                      />
                      <img
                        src={room.image3}
                        alt="Habitaciones Downtown"
                        className="object-cover lg:w-[14rem] lg:h-[9rem]  w-[6rem] h-28  rounded "
                      />
                      <img
                        src={room.image4}
                        alt="Habitaciones Downtown"
                        className="object-cover lg:w-[14rem] lg:h-[9rem] w-[6rem] h-28  rounded "
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white md:w-[26rem] md:h-[19.5rem] w-[21rem] p-6 space-y-4 flex flex-col ">
                      <p className="text-titulo text-left font-Lobster text-2xl">
                        {room.title}
                      </p>
                      <div className="lg:w-[100%] w-[90%] h-[2px] bg-titulo/90 mr-auto "></div>
                      <div className="font-Montserrat text-gray-700 flex flex-col space-y-2">
                        <p className="text-left text-texto">{room.price}</p>
                        <p className="break-words overflow-hidden text-left text-texto">{room.description}</p>
                      </div>

                      <button
                        className="text-white bg-botones hover:bg-red-700 font-semibold text-sm font-Montserrat px-4 py-2 rounded-lg w-[10rem] "
                      >
                        BOOK
                      </button>
                    </div>


                    <div className="bg-white p-6  md:h-[17rem] space-y-4">
                      <p className="text-titulo text-left font-Lobster text-2xl">Amenidades</p>
                      <div className="lg:w-[100%] w-[90%] h-[2px] bg-titulo/90 mr-auto "></div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="inline-flex items-center bg-gray-100 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm text-texto font-Montserrat col-span-2 w-fit">
                          <img src="https://i.ibb.co/0jC0W3CB/cama.png" alt="bed" className="w-5 h-5 mr-2" />
                          {room.beds}
                        </div>

                        <div className="inline-flex items-center bg-gray-100 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm text-texto font-Montserrat w-fit">
                          <img src="https://i.ibb.co/v4nThz4D/cafe.png" alt="desayuno" className="w-5 h-5 mr-2" />
                          Desayuno
                        </div>

                        <div className="inline-flex items-center bg-gray-100 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm text-texto font-Montserrat w-fit">
                          <img src="https://i.ibb.co/Wb5QYFT/ducha.png" alt="baño" className="w-5 h-5 mr-2" />
                          Baño privado
                        </div>

                        <div className="inline-flex items-center bg-gray-100 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm text-texto font-Montserrat w-fit">
                          <img src="https://i.ibb.co/Xk39FNCD/minibar.png" alt="minibar" className="w-5 h-5 mr-2" />
                          Mini Bar
                        </div>

                        <div className="inline-flex items-center bg-gray-100 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm text-texto font-Montserrat w-fit">
                          <img src="https://i.ibb.co/6RVMXzBT/television.png" alt="smart tv" className="w-5 h-5 mr-2" />
                          Smart TV
                        </div>

                        <div className="inline-flex items-center bg-gray-100 px-1 lg:px-3 py-1 rounded-full text-xs lg:text-sm text-texto font-Montserrat w-fit max-w-full overflow-hidden whitespace-nowrap">

                          <img src="https://i.ibb.co/fVtQjcY0/aire-Acondicionado.png" alt="aire acondicionado" className="w-5 h-5 mr-2" />
                          Aire acondicionado
                        </div>

                        <div className="inline-flex items-center bg-gray-100 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm text-texto font-Montserrat w-fit">
                          <img src="https://i.ibb.co/hJxXsKtt/wifi.png" alt="wifi" className="w-5 h-5 mr-2" />
                          Wifi
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={prevImage}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-botones text-white p-1 sm:p-2 rounded-full"
        aria-label="Imágenes anteriores"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextImage}
        className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-botones text-white p-1 sm:p-2 rounded-full"
        aria-label="Siguientes imágenes"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>


    </div>
  );
}