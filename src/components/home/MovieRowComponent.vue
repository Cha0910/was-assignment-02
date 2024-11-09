<template>
  <div class="movie-row">
    <h2>{{ title }}</h2>
    <div class="slider-container"
         @wheel="handleWheel"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd"
         @mousemove="handleMouseMove"
         @mouseleave="handleMouseLeave">
      <button class="slider-button left"
              @click="slide('left')"
              :style="{ opacity: showButtons && !atLeftEdge ? 1 : 0 }"
              :disabled="atLeftEdge">&lt;</button>
      <div class="slider-window" ref="sliderWindow">
        <div class="movie-slider" ref="slider" :style="{ transform: 'translateX(' + (-scrollAmount) + 'px)' }">
          <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="toggleWishlist(movie)">
            <img :src="getImageUrl(movie.poster_path)" :alt="movie.title">
            <div v-if="isInWishlist(movie.id)" class="wishlist-indicator">👍</div>
          </div>
        </div>
      </div>
      <button class="slider-button right"
              @click="slide('right')"
              :style="{ opacity: showButtons && !atRightEdge ? 1 : 0 }"
              :disabled="atRightEdge">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    fetchUrl: String
  },
  data() {
    return {
      movies: [],
      scrollAmount: 0,
      showButtons: false,
      isScrolling: false,
      touchStartX: 0,
      touchEndX: 0,
      maxScroll: 0
    };
  },
  async created() {
    await this.fetchMovies();
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await fetch(this.fetchUrl);
        const data = await response.json();
        this.movies = data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w300${path}`;
    },
    slide(direction) {
      const slideAmount = this.$refs.sliderWindow.clientWidth * 0.8;
      if (direction === 'left') {
        this.scrollAmount = Math.max(0, this.scrollAmount - slideAmount);
      } else {
        this.scrollAmount = Math.min(this.maxScroll, this.scrollAmount + slideAmount);
      }
    },
    handleMouseMove() {
      this.showButtons = true;
    },
    handleMouseLeave() {
      this.showButtons = false;
    },
    handleWheel(event) {
      event.preventDefault();
      if (this.isScrolling) return;
      this.isScrolling = true;
      const direction = event.deltaY > 0 ? 'right' : 'left';
      this.slide(direction);
      setTimeout(() => (this.isScrolling = false), 500);
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },
    handleTouchEnd() {
      const touchDiff = this.touchStartX - this.touchEndX;
      const minSwipeDistance = 50;
      if (Math.abs(touchDiff) > minSwipeDistance) {
        const direction = touchDiff > 0 ? 'right' : 'left';
        this.slide(direction, Math.abs(touchDiff));
      }
    },
    handleResize() {
      this.calculateMaxScroll();
      this.scrollAmount = Math.min(this.scrollAmount, this.maxScroll);
    },
    toggleWishlist(movie) {
      // Wishlist toggle logic
    },
    isInWishlist(movieId) {
      // Check if movie is in wishlist
      return false; // Placeholder
    },
    calculateMaxScroll() {
      if (this.$refs.slider && this.$refs.sliderWindow) {
        this.maxScroll = Math.max(0, this.$refs.slider.scrollWidth - this.$refs.sliderWindow.clientWidth);
      }
    }
  }
};
</script>

<style scoped>
/* Movie row CSS from movie-row.component.css */
.movie-row {
  margin: 20px 0;
}

.slider-container {
  display: flex;
  align-items: center;
  position: relative;
}

.slider-window {
  overflow: hidden;
  width: 100%;
}

.movie-slider {
  display: flex;
  transition: transform 0.5s ease;
}

.movie-card {
  margin: 0 10px;
  cursor: pointer;
  width: 150px;
  border-radius: 10px;
}

.movie-card img {
  width: 100%;
  border-radius: 10px;
}

.wishlist-indicator {
  position: absolute;
  top: 5px;
  left: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 5px;
}
</style>
