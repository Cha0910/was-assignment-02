class WishlistManager {
    constructor() {
        this.wishlist = [];
        this.loadWishlist();
    }

    loadWishlist() {
        const storedWishlist = localStorage.getItem('movieWishlist');
        if (storedWishlist) {
            this.wishlist = JSON.parse(storedWishlist);
        }
    }

    saveWishlist() {
        localStorgage.setItem('movieWishlist', JSON.stringify(this.wishlist));
    }

    toggleWishlist(movie) {
        const index = this.wishlist.findIndex(item => item.id === movie.id);
        if (index === -1) {
            this.wishlist.push(movie);
        } else {
            this.wishlist.splice(index, 1);
        }
        this.saveWishlist();
    }

    isInWishlist(movieId) {
        return this.wishlist.some(item => item.id === movieId);
    }

    getWishlist() {
        return this.wishlist;
    }
}

export default WishlistManager;
