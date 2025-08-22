<template>
  <n-space vertical size="large" style="padding: 24px; max-width: 980px; margin: auto;">
    <!-- 页面标题 -->
    <h1 style="font-size: 24px; font-weight: bold; text-align: center;">Sensor Data Dashboard</h1>

    <!-- 最近一次传感器数据 -->
    <n-card title="Last Data" style="text-align: center;">
      <div style="font-size: 18px; margin-top: 8px;">
        <div>Time: {{ latestData?.Timestamp ?? '--' }}</div>
        <div v-for="(value, key) in sensorFields(latestData)" :key="key">
          {{ key }}: {{ value ?? '--' }}
        </div>
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
  pageSize: 20,
  pageSizes: [5, 10, 20],
  showSizePicker: true
})

// 动态列
const columns = ref([
  { title: 'ID', key: 'id', width: 180 },
  { title: 'Timestamp', key: 'Timestamp', width: 180, sorter: (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp) }
])

// 计算最近一次数据
const latestData = computed(() => {
  if (records.value.length === 0) return null
  return records.value.reduce((prev, curr) =>
    new Date(prev.Timestamp) > new Date(curr.Timestamp) ? prev : curr
  )
})

// 取出所有传感器字段
function sensorFields(record) {
  if (!record) return {}
  const result = {}
  for (const [key, value] of Object.entries(record)) {
    if (key.startsWith('TEMP') || key.startsWith('HUM')) {
      result[key] = value
    }
  }
  return result
}

// 拉取数据并动态生成列
async function fetchData() {
  try {
    const res = await fetch('/.netlify/functions/getData')
    const data = await res.json()
    records.value = data.records.map(r => ({ id: r.id, ...r.fields }))

    // 根据第一条数据生成列
    if (records.value.length > 0) {
      const sample = records.value[0]
      const dynamicCols = Object.keys(sample)
        .filter(k => k.startsWith('TEMP') || k.startsWith('HUM'))
        .map(k => ({
          title: k,
          key: k,
          width: 100,
          sorter: (a, b) => (a[k] ?? 0) - (b[k] ?? 0)
        }))
      columns.value = [
        { title: 'ID', key: 'id', width: 180 },
        { title: 'Timestamp', key: 'Timestamp', width: 180, sorter: (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp) },
        ...dynamicCols
      ]
    }
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
