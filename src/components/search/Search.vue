<template>
  <div class="search-filter">
    <div class="filter-block" :class="{ active: filters.genre !== '0' }">
      <label>장르:</label>
      <select v-model="filters.genre" @change="emitFilters" class="filter-select">
        <option value="0">전체</option>
        <option v-for="(value, key) in genreCode" :key="key" :value="value">{{ key }}</option>
      </select>
    </div>
    <div class="filter-block" :class="{ active: filters.age !== '-1' }">
      <label>평점:</label>
      <select v-model="filters.age" @change="emitFilters" class="filter-select">
        <option value="-1">전체</option>
        <option v-for="(value, key) in ageCode" :key="key" :value="value">{{ key }}</option>
      </select>
    </div>
    <div class="filter-block" :class="{ active: filters.sorting !== 'all' }">
      <label>언어:</label>
      <select v-model="filters.sorting" @change="emitFilters" class="filter-select">
        <option value="all">전체</option>
        <option v-for="(value, key) in sortingCode" :key="key" :value="value">{{ key }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      filters: {
        genre: "0",
        age: "-1",
        sorting: "all",
      },
    };
  },
  props: {
    genreCode: Object,
    sortingCode: Object,
    ageCode: Object,
  },
  methods: {
    emitFilters() {
      this.$emit("filter-changed", this.filters);
    },
  },
};
</script>

<style scoped>
.search-filter {
  display: flex;
  margin-top: 10px;
  margin-right: 50px;
  gap: 15px; /* 각 블럭 간 간격 */
  align-items: center; /* 레이블과 드롭다운을 수평 가운데 정렬 */
  justify-content: flex-end; /* 블럭들을 오른쪽 정렬 */
}

.filter-block {
  display: flex;
  align-items: center; /* 레이블과 드롭다운을 수평 정렬 */
  gap: 10px;
  border-radius: 8px;
  padding: 10px;
  background-color: #333; /* 기본 블럭 색상 */
  border: 2px solid transparent; /* 기본 테두리 색상 */
  transition: background-color 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.filter-block.active {
  background-color: #535bf2; /* 선택된 경우 파란색 */
  border-color: #535bf2; /* active 상태 테두리 */
}

.filter-block.active:hover {
  border-color: #333; /* active 상태에서 마우스 오버 시 테두리 색상 */
}

.filter-block:hover:not(.active) {
  border-color: #535bf2; /* active가 아닌 상태에서 마우스 오버 시 테두리 색상 */
}

label {
  font-size: 14px;
  color: white;
  font-weight: bold;
}

.filter-select {
  padding: 8px;
  width: 160px;
  font-size: 14px;
  color: white;
  border: none; /* 드롭다운 자체 경계선 제거 */
  border-radius: 4px;
  background-color: inherit; /* 부모의 배경색을 상속 */
}

.filter-select:focus {
  box-shadow: none; /* 하얀색 그림자 제거 */
  outline: none; /* 기본 outline 제거 */
}

.filter-select:hover {
  box-shadow: none; /* 하얀색 그림자 제거 */
  outline: none;
}

@media (max-width: 768px) {
  .search-filter {
    flex-wrap: wrap; /* 화면이 좁아질 경우 줄 바꿈 */
    margin-right: 15px;
    gap: 10px;
  }
  .filter-block {
    width: 30%;
  }
  .filter-select {
    width: 100%; /* 좁은 화면에서는 드롭다운이 화면에 맞게 늘어나도록 */
  }
}
</style>
