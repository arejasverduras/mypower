import Image from "next/image"

export const Exercise = ({data, key}) => {

    return (
        <div className="my-5 ">
            <h4>{data.title}</h4>
            <Image 
                src={data.image} 
                alt={data.title} 
                width="1600" 
                height="900"
            />
            {data.video}
        </div>
    )
}