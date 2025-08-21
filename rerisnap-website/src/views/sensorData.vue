<template>
  <n-space vertical size="large" style="padding: 24px; max-width: 980px; margin: auto;">
    <!-- 页面标题 -->
    <h1 style="font-size: 24px; font-weight: bold; text-align: center;">Sensor Data Dashboard</h1>

    <!-- 最近一次温湿度 -->
    <n-card title="Last Data" style="text-align: center;">
      <div style="font-size: 20px; margin-top: 8px;">
        Time: {{ latestData?.Timestamp ?? '--' }} &nbsp;&nbsp; | &nbsp;&nbsp;
        Temperature: {{ latestData?.TEMP ?? '--' }} °C &nbsp;&nbsp; | &nbsp;&nbsp;
        Humidity: {{ latestData?.HUM ?? '--' }} %
      </div>
    </n-card>

    <!-- 数据表格 -->
    <n-data-table
      :columns="columns"
      :data="records"
      :pagination="pagination"
      :row-key="row => row.id"
      @update:page="onPageChange"
      @update:page-size="onPageSizeChange"
      style="background: #fff; border-radius: 8px; padding: 16px;"
    />
  </n-space>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { NDataTable, NSpace, NCard } from 'naive-ui'

const records = ref([])

const pagination = ref({
  page: 1,
  pageSize: 5,
  pageSizes: [5, 10, 20],
  showSizePicker: true
})

const columns = [
  { title: 'ID', key: 'id', width: 180 },
  { title: 'Timestamp', key: 'Timestamp', width: 180, sorter: (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp) },
  { title: 'Temperature', key: 'TEMP', width: 100, sorter: (a, b) => a.TEMP - b.TEMP },
  { title: 'Humidity', key: 'HUM', width: 100, sorter: (a, b) => a.HUM - b.HUM }
]

// 最近一次温湿度
const latestData = computed(() => {
  if (records.value.length === 0) return null
  // 按时间排序，取最后一条
  return records.value.reduce((prev, curr) => new Date(prev.Timestamp) > new Date(curr.Timestamp) ? prev : curr)
})

async function fetchData() {
  try {
    const res = await fetch('/.netlify/functions/getData')
    const data = await res.json()
    records.value = data.records.map(r => ({ id: r.id, ...r.fields }))
  } catch (error) {
    console.error('获取数据失败', error)
  }
}

function onPageChange(page) {
  pagination.value.page = page
}

function onPageSizeChange(pageSize) {
  pagination.value.pageSize = pageSize
  pagination.value.page = 1
}

onMounted(() => {
  fetchData()
})
</script>
