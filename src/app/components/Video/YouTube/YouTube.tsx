interface YouTubeProps {
    embedId: string
}

export const YouTube = ({embedId}:YouTubeProps) => {
    const baseUrl = "https://www.youtube.com/embed/"
    const returnUrl = baseUrl+embedId;
    return (
        
            <iframe 
                className="max-w-full max-h-full"
                width="1120" 
                height="600" 
                src={returnUrl}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>

    )
};
