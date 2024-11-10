<template>
  <div class="movie-grid">
    <h1>My Wishlist</h1>
    <div v-if="wishlistMovies.length === 0" class="empty-wishlist">
      위시리스트가 비어 있습니다.
    </div>
    <div v-else class="grid-container">
      <div v-for="(movieGroup, index) in visibleWishlistMovies" :key="index" class="movie-row">
        <div v-for="movie in movieGroup" :key="movie.id" class="movie-card" @click="toggleWishlist(movie)">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
          <div class="wishlist-indicator">👍</div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
    </div>
  </div>
</template>

<script>
import WishlistManager from '@/utils/useWishlist.js';

export default {
  data() {
    return {
      wishlistMovies: [],
      visibleWishlistMovies: [],
      rowSize: 4,
      moviesPerPage: 20,
      currentPage: 1,
      isMobile: window.innerWidth <= 768
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.loadWishlist();
    this.calculateLayout();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    loadWishlist() {
      const wishlistManager = new WishlistManager();
      this.wishlistMovies = wishlistManager.getWishlist();
      this.updateVisibleMovies();
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
    },
    toggleWishlist(movie) {
      const wishlistManager = new WishlistManager();
      wishlistManager.toggleWishlist(movie);
      this.loadWishlist();
    },
    calculateLayout() {
      this.isMobile = window.innerWidth <= 768;
      const containerWidth = window.innerWidth;
      const movieCardWidth = this.isMobile ? 90 : 220;
      this.rowSize = Math.floor(containerWidth / (movieCardWidth + 15));
      this.moviesPerPage = this.rowSize * 3; // 최대 표시 행 수
      this.updateVisibleMovies();
    },
    updateVisibleMovies() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      const paginatedMovies = this.wishlistMovies.slice(startIndex, endIndex);
      this.visibleWishlistMovies = paginatedMovies.reduce((resultArray, item, index) => {
        const groupIndex = Math.floor(index / this.rowSize);
        if (!resultArray[groupIndex]) {
          resultArray[groupIndex] = [];
        }
        resultArray[groupIndex].push(item);
        return resultArray;
      }, []);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateVisibleMovies();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateVisibleMovies();
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.wishlistMovies.length / this.moviesPerPage);
    }
  }
};
</script>

<style scoped>
.movie-grid {
  width: 100%;
  margin-bottom: 40px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.movie-card {
  width: 160px;
  margin: 0 10px;
  transition: transform 0.3s;
  position: relative;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 4px;
}

.movie-title {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-wishlist {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
