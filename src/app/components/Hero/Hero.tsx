import Image from "next/image";



export const Hero = () => {

    return (
        <div className="flex flex-wrap  min-h-96 w-full justify-center" >
            <h1 className="text-5xl m-5 italic shadow-lg ">
                Jara&apos;s Fitness
            </h1>
            <Image 
                src='/images/JaraFitM.png' 
                width='1203' 
                height='955' 
                alt='Jara at the beach'
                className="rounded-r-full mr-5"
                >
            </Image>
        </div>
    )
};