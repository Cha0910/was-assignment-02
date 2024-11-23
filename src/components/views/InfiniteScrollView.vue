<template>
  <div class="movie-grid" ref="gridContainer" @scroll.passive="handleScroll">
    <div class="grid-container">
      <div
          v-for="(movieGroup, index) in visibleMovieGroups"
          :key="index"
          class="movie-row"
      >
        <div
            v-for="movie in movieGroup"
            :key="movie.id"
            class="movie-card"
            @click="toggleWishlist(movie)"
        >
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-title">{{ movie.title }}</div>
          <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">⭐</div>
        </div>
      </div>
    </div>
    <div class="loading-indicator" v-if="isLoading">
      <div class="spinner"></div>
      <span>Loading...</span>
    </div>
    <button v-if="showTopButton" class="top-button" @click="scrollToTop">
      Top
    </button>
  </div>
</template>

<script>
import {ref, computed, onMounted, onUnmounted, watch} from "vue";
import axios from "axios";
import WishlistManager from "@/utils/useWishlist.js";

export default {
  name: "InfiniteScrollView",
  props: {
    fetchUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const gridContainer = ref(null);
    const movies = ref([]);
    const isLoading = ref(false);
    const currentPage = ref(1);
    const hasMore = ref(true);
    const showTopButton = ref(false);
    const isMobile = ref(window.innerWidth <= 768);
    const wishlistManager = new WishlistManager();
    const rowSize = ref(4);

    const fetchMovies = async () => {
      if (isLoading.value || !hasMore.value) return;

      isLoading.value = true;
      try {
        const response = await axios.get(props.fetchUrl, {
          params: { page: currentPage.value },
        });
        const newMovies = response.data.results;

        if (newMovies.length === 0) {
          hasMore.value = false;
        } else {
          movies.value = [...movies.value, ...newMovies];
          currentPage.value++;
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const getImageUrl = (path) =>
        path ? `https://image.tmdb.org/t/p/w300${path}` : "/placeholder-image.jpg";

    const toggleWishlist = (movie) => {
      wishlistManager.toggleWishlist(movie);
      movies.value = [...movies.value];
    };

    const isInWishlist = (movieId) => wishlistManager.isInWishlist(movieId);

    const handleScroll = () => {
      const container = gridContainer.value;
      if (
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 100 &&
          !isLoading.value &&
          hasMore.value
      ) {
        fetchMovies();
      }
      showTopButton.value = container.scrollTop > 300;
    };

    const scrollToTop = () => {
      gridContainer.value.scrollTo({ top: 0, behavior: "smooth" });
    };

    const visibleMovieGroups = computed(() =>
        movies.value.reduce((resultArray, item, index) => {
          const groupIndex = Math.floor(index / rowSize.value);
          if (!resultArray[groupIndex]) {
            resultArray[groupIndex] = [];
          }
          resultArray[groupIndex].push(item);
          return resultArray;
        }, [])
    );

    const calculateLayout = () => {
      const containerWidth = gridContainer.value.offsetWidth;
      const movieCardWidth = isMobile.value ? 90 : 200;
      const horizontalGap = isMobile.value ? 10 : 15;
      rowSize.value = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
    };

    const resetMovies = () => {
      movies.value = [];
      hasMore.value = true;
      isLoading.value = false;
      fetchMovies();
    };

    watch(
        () => props.fetchUrl,
        () => {
          resetMovies();
        },
        { deep: true }
    );

    onMounted(() => {
      fetchMovies();
      calculateLayout();
    });

    onUnmounted(() => {
      // Cleanup logic if needed
    });

    return {
      gridContainer,
      movies,
      isLoading,
      hasMore,
      showTopButton,
      fetchMovies,
      getImageUrl,
      toggleWishlist,
      isInWishlist,
      handleScroll,
      scrollToTop,
      visibleMovieGroups,
    };
  },
};
</script>

<style scoped>
.wishlist-indicator {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 20px;
  color: gold;
  background-color: transparent;
  box-shadow: none;
}

.movie-grid {
  height: calc(100vh - 200px);
  margin-bottom: 40px;
  margin-top: 30px;
  display: flex;
  overflow-x: hidden;
  overflow-y: scroll;
  flex-direction: column;
  justify-content: space-between;
}

.grid-container {
  width: 100vw;
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
  margin: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-title {
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
  color: white;
}

.wishlist-indicator {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: gold;
}

.loading-indicator {
  text-align: center;
  margin: 20px 0;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e50914;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
}
</style>
