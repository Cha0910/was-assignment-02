<template>
  <div class="movie-grid">
    <div :class="['grid-container', currentView]">
      <div v-for="(movieGroup, index) in visibleWishlistMovies" :key="index" :class="['movie-row', { 'full': movieGroup.length === rowSize }]">
        <div v-for="movie in movieGroup" :key="movie.id" class="movie-card" @click="toggleWishlist(movie)">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
          <div class="wishlist-indicator">⭐</div>
        </div>
      </div>
    </div>
    <div v-if="wishlistMovies.length === 0" class="empty-wishlist">
      위시리스트가 비어 있습니다.
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
  name: 'WishlistPage',
  data() {
    return {
      wishlistManager: new WishlistManager(),
      wishlistMovies: [],
      visibleWishlistMovies: [],
      currentPage: 1,
      moviesPerPage: 20,
      rowSize: 4,
      currentView: 'grid',
      isMobile: window.innerWidth <= 768
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.wishlistMovies.length / this.moviesPerPage);
    }
  },
  created() {
    this.loadWishlist();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    loadWishlist() {
      this.wishlistMovies = this.wishlistManager.getWishlist();
      this.updateVisibleMovies();
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
    },
    updateVisibleMovies() {
      const maxRows = 2; // 최대 줄 수
      this.moviesPerPage = this.rowSize * maxRows; // rowSize에 맞춰 2줄의 아이템 수로 제한
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
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      this.calculateLayout();
    },
    calculateLayout() {
      const containerWidth = window.innerWidth;
      const movieCardWidth = this.isMobile ? 90 : 220;
      const horizontalGap = this.isMobile ? 10 : 15;

      this.rowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      this.moviesPerPage = this.rowSize * 3; // Assume 3 rows visible at once
      this.updateVisibleMovies();
    },
    toggleWishlist(movie) {
      this.wishlistManager.toggleWishlist(movie);
      this.loadWishlist();
    }
  }
};
</script>

<style scoped>
.wishlist-indicator {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 20px;
  color: gold; /* 별의 색상 */
  background-color: transparent; /* 배경을 투명하게 설정 */
  box-shadow: none; /* 그림자 제거 */
}

.movie-grid {
  width: 100vw;
  height: calc(100vh - 200px);
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #141414;
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
  width: 100%;
}

.movie-card {
  width: 200px;
  margin: 10px 20px;
  transition: transform 0.3s;
  position: relative;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
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
  margin-top: 20px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
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

@media (max-width: 768px) {
  .movie-card {
    width: 90px;
    margin: 0 5px;
  }

  .movie-title {
    font-size: 12px;
  }

  .pagination button {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>
