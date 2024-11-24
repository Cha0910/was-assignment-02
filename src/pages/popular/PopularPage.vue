<template>
  <div class="popular-container">
    <div class="view-toggle">
      <button @click="setView('table')" :class="{ active: currentView === 'table' }">
        <i class="fas fa-th"></i> Table View
      </button>
      <button @click="setView('infinite')" :class="{ active: currentView === 'infinite' }">
        <i class="fas fa-bars"></i> Infinite Scroll
      </button>
    </div>

    <TableView v-if="currentView === 'table'" :fetch-url="popularMoviesUrl" />
    <InfiniteScrollView v-if="currentView === 'infinite'" :fetch-url="popularMoviesUrl" />
  </div>
</template>

<script>
import TableView from '@/components/views/TableView.vue';
import InfiniteScrollView from '@/components/views/InfiniteScrollView.vue';
import { getURL4PopularMovies } from '@/utils/URL.js';

export default {
  components: {
    TableView,
    InfiniteScrollView
  },
  data() {
    return {
      apiKey: localStorage.getItem('TMDb-Key') || '', // API 키 가져오기
      popularMoviesUrl: '',
      currentView: 'table'
    };
  },
  created() {
    // API URL 생성
    this.popularMoviesUrl = getURL4PopularMovies(this.apiKey);
  },
  methods: {
    setView(view) {
      this.currentView = view;
      document.body.style.overflow = view === 'table' ? 'hidden' : 'auto';
    }
  }
};
</script>

<style scoped>
.popular-container {
  padding: 20px;
}

.view-toggle {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 20px;
  margin-right: 50px;
}

.view-toggle button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.view-toggle button.active {
  background-color: #535bf2;
}

.view-toggle i {
  margin-right: 5px;
}
</style>
