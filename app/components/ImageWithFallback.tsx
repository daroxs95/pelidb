import {ImgHTMLAttributes, useEffect, useState} from "react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc: string;
}

export function ImageWithFallback ({fallbackSrc, alt, src, ...rest}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(fallbackSrc);

    const onError = () => {
        setImgSrc(fallbackSrc);
    }

    // TODO: This is a trick to make onError work on first page load
    useEffect(() => {
        if(src) setImgSrc(src);
    }, [src])

    return (
        <img src={imgSrc} onError={onError} alt={alt || ""} {...rest}/>
    )
}