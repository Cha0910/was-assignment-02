<template>
  <div class="infinite-scroll-view">
    <div class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>
    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <button v-if="showTopButton" class="top-button" @click="scrollToTop">Top</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const fetchUrl = defineProps(['fetchUrl']);
const movies = ref([]);
const isLoading = ref(false);
const showTopButton = ref(false);
const currentPage = ref(1);

async function fetchMovies() {
  if (isLoading.value) return;
  isLoading.value = true;
  const response = await axios.get(fetchUrl, { params: { page: currentPage.value } });
  movies.value.push(...response.data.results);
  isLoading.value = false;
  currentPage.value++;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  showTopButton.value = window.scrollY > 300;
  const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
  if (bottom) fetchMovies();
}

onMounted(() => {
  fetchMovies();
  window.addEventListener('scroll', handleScroll);
});

</script>

<style scoped>
.infinite-scroll-view .movie-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.movie-card {
  width: 200px;
  margin: 10px;
  text-align: center;
}

.movie-card img {
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
}

.loading-indicator {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #fff;
}

.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #E50914;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-weight: bold;
}
</style>
