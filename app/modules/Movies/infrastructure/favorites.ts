export function getFavorites() {
    if (typeof localStorage === "undefined") return [];
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export function addFavorite(id: string) {
    if (typeof localStorage === "undefined") return;

    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

export function removeFavorite(id: string) {
    if (typeof localStorage === "undefined") return;

    const favorites: string[] = getFavorites();
    const newFavorites = favorites.filter(f => f !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
}

export function isFavorite(id: string) {
    if (typeof localStorage === "undefined") return false;

    return getFavorites().includes(id);
}
