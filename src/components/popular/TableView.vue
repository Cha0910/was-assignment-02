<template>
  <div class="table-view">
    <div class="movie-grid">
      <div v-for="movie in paginatedMovies" :key="movie.id" class="movie-card">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
        <div class="movie-title">{{ movie.title }}</div>
      </div>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">&lt; 이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">다음 &gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const fetchUrl = defineProps(['fetchUrl']);
const movies = ref([]);
const currentPage = ref(1);
const moviesPerPage = 20;

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * moviesPerPage;
  return movies.value.slice(start, start + moviesPerPage);
});

const totalPages = computed(() => Math.ceil(movies.value.length / moviesPerPage));

async function fetchMovies() {
  const response = await axios.get(fetchUrl, { params: { page: currentPage.value } });
  movies.value = response.data.results;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

onMounted(fetchMovies);
</script>

<style scoped>
.table-view .movie-grid {
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
