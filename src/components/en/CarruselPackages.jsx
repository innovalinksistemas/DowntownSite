'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paquetes, setpaquetes] = useState([]);

    // Función para obtener las habitaciones desde el JSON
    useEffect(() => {
        const fetchpaquetes = async () => {
            const response = await fetch('packages.json');
            const data = await response.json();
            setpaquetes(data);
        };

        fetchpaquetes();
    }, []);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % paquetes.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + paquetes.length) % paquetes.length);
    };

    const getVisibleImages = () => {
        const visibleImages = [];
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + paquetes.length) % paquetes.length;
            visibleImages.push(paquetes[index]);
        }
        return visibleImages;
    };

    if (paquetes.length === 0) {
        return <p>Loading...</p>;
    }


    return (
        <div className="relative w-full mx-auto min-h-[44rem] lg:min-h-[30rem]">

            <div className="flex justify-center transition-transform duration-500 ease-in-out" >
                {getVisibleImages().map((paq, index) => {
                    const isActive = index === 1;
                    return (
                        <div
                            key={paq.id}
                            className={`transition-all duration-500 transform mx-4 ${isActive ? 'scale-105 opacity-100' : 'scale-90 opacity-50'
                                } ${index === 0 || index === 2 ? 'hidden md:hidden' : ''
                                }`}

                        >
                            <div class="max-w-[1100px]  p-4 ">
                                <div class="grid md:grid-cols-2 gap-12 items-center h-full">
                                    <div class="flex justify-start items-center">
                                        <div class="flex gap-x-8 mx-12 lg:mx-0">
                                            <img
                                                class="lg:w-[17rem] w-[9rem] aspect-[3/4] object-cover rounded-none rounded-tl-[60px]  -translate-x-10"
                                                src={paq.imagenes[0]}
                                                alt={paq.title}
                                            />
                                            <img
                                                class="lg:w-[17rem] w-[9rem] aspect-[3/4] object-cover rounded-br-[60px] translate-y-10 -translate-x-12 "
                                                src={paq.imagenes[1]}
                                                alt={paq.title}
                                            />
                                        </div>
                                    </div>


                                    <div class="text-left  mx-4 lg:mx-0 text-titulo">
                                        <h3 class="lg:text-4xl text-2xl font-Lobster mb-4">{paq.title}</h3>
                                        <h3 class="lg:text-base text-xl font-Montserrat font-bold ">{paq.subtitle}</h3>


                                        <p class="font-Montserrat text-sm sm:text-sm text-texto mb-6">
                                            {paq.description}
                                        </p>
                                        <a
                                            href={`/Downtown/packagedetails/en/${paq.id}`}
                                            class="bg-botones text-white px-6 py-2 rounded hover:bg-red-700 transition"
                                        >
                                            SEE MORE
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-botones text-white p-1 sm:p-2 rounded-full"
                aria-label="Imágenes anteriores"
            >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-botones text-white p-1 sm:p-2 rounded-full"
                aria-label="Siguientes imágenes"
            >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
        </div>
    );
}

