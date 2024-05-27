import {ImgHTMLAttributes, useState} from "react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

// TODO: the onError only triggers on client navigation, not on first page load
export function ImageWithFallback ({fallbackSrc, alt, src, ...rest}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);

    const onError = () => {
        if(fallbackSrc) setImgSrc(fallbackSrc);
    }

    return (
        <img src={imgSrc} onError={onError} alt={alt || ""} {...rest}/>
    )
}