<template>
  <div>
    <div class="loading-container" v-if="isLoading"><n-spin size="large" v-if="isLoading" /></div>
    <div v-else>
      <n-space vertical size="large" class="dashboard-container">
        <!-- 页面标题 -->
        <h1 class="dashboard-title">📊 Sensor Data Dashboard</h1>


        <!-- 日期选择 & 搜索按钮 -->
        <div class="filter-bar">
          <n-date-picker type="datetimerange" v-model:value="range" clearable />
          <n-button @click="fetchData" type="primary">🔍 Search</n-button>
        </div>

        <!-- 折线图 -->
        <n-card title="Temperature & Humidity Trend" class="card">
          <v-chart :option="chartOption" class="chart" />
        </n-card>

        <!-- 数据表格 -->
        <n-card title="Data Records" class="card">
          <div class="table-wrapper">
            <n-data-table :columns="columns" :data="records" :pagination="pagination" :row-key="(row) => row.id"
              size="small" :bordered="false" @update:page="onPageChange" @update:page-size="onPageSizeChange" />
          </div>
        </n-card>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import VChart from "vue-echarts";
import * as echarts from "echarts";

const records = ref([]);
const todayStart = new Date().setHours(0, 0, 0, 0);
const range = ref([todayStart, Date.now()]);
defineExpose({});
// 注册组件
const chartOption = ref({});

const isLoading = ref(true);

const chartData = computed(() => {
  if (records.value.length === 0) {
    return { times: [], temp1: [], hum1: [], temp2: [], hum2: [] };
  }

  const sorted = [...records.value].sort(
    (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp)
  );

  return {
    times: sorted.map((r) => formatToBerlinTime(r.Timestamp)), // 横坐标：时间
    temp1: sorted.map((r) => r.TEMP1 ?? null),
    hum1: sorted.map((r) => r.HUM1 ?? null),
    temp2: sorted.map((r) => r.TEMP2 ?? null),
    hum2: sorted.map((r) => r.HUM2 ?? null),
  };
});

watch(chartData, (data) => {
  const isMobile = window.innerWidth < 768

  chartOption.value = {
    tooltip: { trigger: 'axis' },
    legend: {
      type: "scroll",
      orient: "horizontal",
      top: isMobile ? "bottom" : "5%",
      left: "center",
      textStyle: { fontSize: 12 }
    },
    grid: {
      top: isMobile ? 40 : 60,
      bottom: isMobile ? 80 : 60,
      left: 50,
      right: 50
    },
    xAxis: { type: 'category', data: data.times },
    yAxis: [
      { type: 'value', name: 'Temperature (°C)', position: 'left' },
      { type: 'value', name: 'Humidity (%)', position: 'right' }
    ],
    series: [
      { name: 'Sensor1 Temp (°C)', type: 'line', data: data.temp1, yAxisIndex: 0, smooth: true },
      { name: 'Sensor1 Humidity (%)', type: 'line', data: data.hum1, yAxisIndex: 1, smooth: true },
      { name: 'Sensor2 Temp (°C)', type: 'line', data: data.temp2, yAxisIndex: 0, smooth: true },
      { name: 'Sensor2 Humidity (%)', type: 'line', data: data.hum2, yAxisIndex: 1, smooth: true }
    ]
  }
}, { immediate: true })


const pagination = ref({
  page: 1,
  pageSize: 20,
  pageSizes: [5, 10, 20],
  showSizePicker: true,
});

// 动态列
const columns = ref([
  {
    title: "Timestamp",
    key: "Timestamp",
    width: 180,
    sorter: (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp),
  },
]);


// 取出所有传感器字段
function sensorFields(record) {
  if (!record) return {};
  const result = {};
  for (const [key, value] of Object.entries(record)) {
    if (key.startsWith("TEMP") || key.startsWith("HUM")) {
      result[key] = value;
    }
  }
  return result;
}

function formatToBerlinTime(utcString) {
  if (!utcString) return "--";
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(utcString));
}

// 拉取数据并动态生成列
async function fetchData() {
  try {
    const [start, end] = range.value;
    console.log("Fetching data for range:", new Date(start), new Date(end));
    let url = "/.netlify/functions/getData";
    const query = new URLSearchParams({
      start: new Date(start).getTime().toString(),
      end: new Date(end).getTime().toString(),
    }).toString();
    url += `?${query}`;
    const res = await fetch(url);
    const data = await res.json();
    records.value = data.records.map((r) => ({ id: r.id, ...r.fields }));

    // 根据第一条数据生成列
    if (records.value.length > 0) {
      const sample = records.value[0];
      const dynamicCols = Object.keys(sample)
        .filter((k) => k.startsWith("TEMP") || k.startsWith("HUM"))
        .map((k) => ({
          title: k,
          key: k,
          width: 100,
          sorter: (a, b) => (a[k] ?? 0) - (b[k] ?? 0),
        }));
      columns.value = [
        {
          title: "Timestamp",
          key: "Timestamp",
          width: 180,
          sorter: (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp),
          render: (row) => formatToBerlinTime(row.Timestamp),
        },
        ...dynamicCols,
      ];
    }
    isLoading.value = false;
  } catch (error) {
    console.error("获取数据失败", error);
  }
}

function onPageChange(page) {
  pagination.value.page = page;
}

function onPageSizeChange(pageSize) {
  pagination.value.pageSize = pageSize;
  pagination.value.page = 1;
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* 页面整体容器 */
.dashboard-container {
  padding: 16px;
  max-width: 980px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 占满整个视口高度 */
}

/* 大标题 */
.dashboard-title {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  color: #333;
}

/* 卡片统一样式 */
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}


/* 筛选区域：PC 横向，手机纵向 */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin: 12px 0;
}

/* 图表响应式 */
.chart {
  width: 100%;
  height: 400px;
}

@media (max-width: 768px) {
  .chart {
    height: 280px;
  }
}

/* 表格外层容器：小屏可横向滚动 */
.table-wrapper {
  overflow-x: auto;
}
</style>
