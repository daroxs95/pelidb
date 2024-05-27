export function getImageHigh(movieId: string) {
    return `https://img.omdbapi.com/?i=${movieId}&h=1000&apikey=35972be8`
}

export function getImageLow(movieId: string) {
    return `https://img.omdbapi.com/?i=${movieId}&h=300&apikey=35972be8`
}