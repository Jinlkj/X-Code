<template>
  <div class="search-container">
    <el-header class="header">
      <div class="header-content">
        <h1>代码搜索</h1>
        <el-button @click="handleLogout" type="danger">退出登录</el-button>
      </div>
    </el-header>
    
    <el-main>
      <el-row :gutter="20" class="search-row">
        <el-col :span="21">
          <el-input
            v-model="input"
            placeholder="搜索代码仓库..."
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="handleSearch" :loading="loading">
            搜索
          </el-button>
        </el-col>
      </el-row>

      <div v-if="results.length === 0 && !loading" class="empty-state">
        <el-empty description="暂无搜索结果" />
      </div>

      <div v-else class="results-container">
        <el-card v-for="item in results" 
                 :key="item.repo_path" 
                 class="result-card"
                 shadow="hover"
                 @click="navigateToDetail(item)">
          <div class="result-content">
            <div class="repo-header">
              <el-text size="large" type="primary">
                {{ item.repo_name }}
                <el-tag size="small" style="margin-left: 8px">
                  <el-icon><Document /></el-icon>
                  {{ item.license }}
                </el-tag>
              </el-text>
            </div>
            
            <div class="repo-description">
              <el-text truncated>
                {{ item.highlight }}
              </el-text>
            </div>
            
            <div class="repo-footer">
              <el-space>
                <el-tag size="small">
                  <el-icon><CollectionTag /></el-icon>
                  {{ item.language }}
                </el-tag>
                <el-tag size="small" type="warning">
                  <el-icon><Star /></el-icon>
                  {{ item.stars }}
                </el-tag>
              </el-space>
            </div>
          </div>
        </el-card>
      </div>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { Search, Document, CollectionTag, Star } from '@element-plus/icons-vue'

const router = useRouter()
const input = ref('')
const results = ref([])
const loading = ref(false)

const handleSearch = async () => {
  if (!input.value.trim()) return
  
  loading.value = true
  try {
    const response = await axios.post('http://127.0.0.1:8000/search', {
      query: input.value
    }, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    results.value = response.data.map(item => ({
      license: item.license,
      stars: item.stars,
      highlight: item.highlight,
      repo_name: item.repo_name,
      repo_path: item.repo_path,
      language: item.language,
    }))
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

const navigateToDetail = (item) => {
  router.push(`/repository/${encodeURIComponent(item.repo_path)}`)
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.search-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.search-row {
  margin-bottom: 20px;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-card {
  cursor: pointer;
  transition: all 0.3s;
}

.result-card:hover {
  transform: translateY(-2px);
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.repo-header {
  display: flex;
  align-items: center;
}

.repo-description {
  color: #666;
  margin: 8px 0;
}

.repo-footer {
  display: flex;
  gap: 16px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style> 