<template>
  <div class="movie-grid" ref="gridContainer">
    <div :class="['grid-container', currentView]">
      <div v-for="(movieGroup, index) in visibleMovieGroups" :key="index" :class="['movie-row', { 'full': movieGroup.length === rowSize }]">
        <div v-for="movie in movieGroup" :key="movie.id" class="movie-card" @mouseup="toggleWishlist(movie)">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
          <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">⭐</div>
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import WishlistManager from "@/utils/useWishlist.js";
import axios from "axios";

export default {
  name: "TableView",
  props: {
    fetchUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const gridContainer = ref(null);
    const movies = ref([]);
    const currentPage = ref(1);
    const rowSize = ref(4);
    const maxColumn = ref(3);
    const moviesPerPage = ref(20);
    const isMobile = ref(window.innerWidth <= 768);
    const wishlistManager = new WishlistManager();
    const resizeListener = ref(null);

    const fetchMovies = async () => {
      try {
        const totalMoviesNeeded = 120; // 필요한 총 영화 수
        const numberOfPages = Math.ceil(totalMoviesNeeded / moviesPerPage.value);
        let allMovies = [];

        for (let page = 1; page <= numberOfPages; page++) {
          const response = await axios.get(props.fetchUrl, {
            params: {page},
          });
          allMovies = [...allMovies, ...response.data.results];
        }
        movies.value = allMovies.slice(0, totalMoviesNeeded);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const getImageUrl = (path) => {
      return path ? `https://image.tmdb.org/t/p/w300${path}` : "/placeholder-image.jpg";
    };

    const visibleMovieGroups = computed(() => {
      const startIndex = (currentPage.value - 1) * moviesPerPage.value;
      const endIndex = startIndex + moviesPerPage.value;
      const paginatedMovies = movies.value.slice(startIndex, endIndex);

      return paginatedMovies.reduce((resultArray, item, index) => {
        const groupIndex = Math.floor(index / rowSize.value);
        if (!resultArray[groupIndex]) {
          resultArray[groupIndex] = [];
        }
        resultArray[groupIndex].push(item);
        return resultArray;
      }, []);
    });

    const totalPages = computed(() => Math.ceil(movies.value.length / moviesPerPage.value));

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const calculateLayout = () => {
      const containerWidth = gridContainer.value.offsetWidth;
      const movieCardWidth = isMobile.value ? 90 : 200;
      const horizontalGap = isMobile.value ? 10 : 15;
      rowSize.value = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      moviesPerPage.value = rowSize.value * maxColumn.value;
    };

    const toggleWishlist = (movie) => {
      wishlistManager.toggleWishlist(movie);
      wishlistManager.loadWishlist();
    };

    const isInWishlist = (movieId) => {
      return wishlistManager.isInWishlist(movieId);
    };

    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
      calculateLayout();
    };

    onMounted(() => {
      fetchMovies();
      calculateLayout();
      resizeListener.value = window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      gridContainer,
      movies,
      currentPage,
      rowSize,
      moviesPerPage,
      isMobile,
      visibleMovieGroups,
      totalPages,
      fetchMovies,
      getImageUrl,
      nextPage,
      prevPage,
      toggleWishlist,
      isInWishlist,
    };
  },
};
</script>

<style scoped>
.wishlist-indicator {
  position: absolute;
  top: 0;
  right: 40px;
  font-size: 20px;
  color: gold; /* 별의 색상 */
  background-color: transparent; /* 배경을 투명하게 설정 */
  box-shadow: none; /* 그림자 제거 */
}

.movie-grid {
  width: 100vw;
  height: calc(100vh - 200px);
  margin-bottom: 40px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-row {
  display: flex;
  justify-content: center;
  margin: 0 auto 20px;
  width: 100%;
}

.movie-card {
  width: 200px;
  margin: 0 10px;
  transition: transform 0.3s;
  position: relative;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 80%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  object-fit: cover;
}

.movie-title {
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>
