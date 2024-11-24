<template>
  <div class="movie-row">
    <h2>{{ title }}</h2>
    <div
        class="slider-container"
        @wheel.prevent="handleWheel"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousemove="showButtons = true"
        @mouseleave="showButtons = false"
    >
      <button
          class="slider-button left"
          @click="slide('left')"
          :style="{ opacity: showButtons && !atLeftEdge ? 1 : 0 }"
          :disabled="atLeftEdge"
      >
        &lt;
      </button>
      <div class="slider-window" ref="sliderWindow">
        <div class="movie-slider" ref="slider" :style="{ transform: `translateX(${-scrollAmount}px)` }">
          <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="toggleWishlist(movie)">
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title">
            <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">⭐</div>
          </div>
        </div>
      </div>
      <button
          class="slider-button right"
          @click="slide('right')"
          :style="{ opacity: showButtons && !atRightEdge ? 1 : 0 }"
          :disabled="atRightEdge"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
import WishlistManager from '@/utils/useWishlist.js';

export default {
  name: 'MovieRowComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    fetchUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const movies = ref([]);
    const slider = ref(null);
    const sliderWindow = ref(null);
    const scrollAmount = ref(0);
    const showButtons = ref(false);
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const maxScroll = ref(0);

    const atLeftEdge = computed(() => scrollAmount.value <= 0);
    const atRightEdge = computed(() => scrollAmount.value >= maxScroll.value);

    const wishlistManager = new WishlistManager();

    const fetchMovies = async () => {
      try {
        const response = await axios.get(props.fetchUrl);
        movies.value = response.data.results;
        setTimeout(calculateMaxScroll, 0);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const getImageUrl = (path) => `https://image.tmdb.org/t/p/w300${path}`;

    const slide = (direction) => {
      const slideAmount = sliderWindow.value.clientWidth * 0.8;
      if (direction === 'left') {
        scrollAmount.value = Math.max(0, scrollAmount.value - slideAmount);
      } else {
        scrollAmount.value = Math.min(maxScroll.value, scrollAmount.value + slideAmount);
      }
      console.log('Slide amount:', slideAmount); // slideAmount 값을 콘솔에 출력
    };

    const handleWheel = (event) => {
      if (scrollAmount.value !== 0) {
        const direction = event.deltaY > 0 ? 'right' : 'left';
        slide(direction);
      }
    };

    const handleTouchStart = (event) => {
      touchStartX.value = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
      touchEndX.value = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const touchDiff = touchStartX.value - touchEndX.value;
      if (Math.abs(touchDiff) > 50) {
        const direction = touchDiff > 0 ? 'right' : 'left';
        slide(direction);
      }
    };

    const calculateMaxScroll = () => {
      if (slider.value && sliderWindow.value) {
        maxScroll.value = Math.max(0, slider.value.scrollWidth - sliderWindow.value.clientWidth);
      }
    };

    onMounted(() => {
      fetchMovies();
      window.addEventListener('resize', calculateMaxScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', calculateMaxScroll);
    });

    return {
      movies,
      slider,
      sliderWindow,
      scrollAmount,
      showButtons,
      atLeftEdge,
      atRightEdge,
      slide,
      handleWheel,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      getImageUrl,
      toggleWishlist(movie) {
        wishlistManager.toggleWishlist(movie);
        movies.value = [...movies.value];
      },
      isInWishlist(movieId) {
        return wishlistManager.isInWishlist(movieId);
      }
    };
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

.movie-row {
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.movie-row h2 {
  text-align: left;
  margin-left: 30px;
}

.slider-container {
  position: relative;
  touch-action: pan-y;
}

.slider-window {
  overflow: hidden;
  margin: 0 40px;
}

.movie-slider {
  display: flex;
  transition: transform 0.3s ease;
  padding: 20px 0;
  max-width: 94vw;
}

.movie-card {
  flex: 0 0 auto;
  width: 200px;
  margin-right: 10px;
  transition: transform 0.3s;
  position: relative;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 20px 10px;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.3s, background-color 0.3s;
}

.slider-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.slider-button.left {
  left: 0;
}

.slider-button.right {
  right: 0;
}

.slider-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .movie-row {
    margin-bottom: 20px;
  }

  .movie-card {
    width: 120px;
    margin-right: 5px;
  }

  .movie-slider {
    padding: 0;
  }

  .slider-window {
    margin: 0 10px;
  }
}
</style>
