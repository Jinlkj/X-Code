<template>
  <div class="detail-container">
    <el-header class="header">
      <div class="header-content">
        <el-button @click="router.back()" plain>
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
        <h1>仓库详情</h1>
        <el-button @click="handleLogout" type="danger">退出登录</el-button>
      </div>
    </el-header>

    <el-main v-loading="loading">
      <template v-if="repository">
        <el-card class="detail-card">
          <template #header>
            <div class="card-header">
              <h2>{{ repository.repo_name }}</h2>
              <el-tag size="large">
                <el-icon><Document /></el-icon>
                {{ repository.license }}
              </el-tag>
            </div>
          </template>

          <div class="detail-content">
            <div class="description">
              <h3>描述</h3>
              <p>{{ repository.highlight }}</p>
            </div>

            <div class="metadata">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-card shadow="hover">
                    <template #header>
                      <div class="metadata-header">
                        <el-icon><CollectionTag /></el-icon>
                        <span>编程语言</span>
                      </div>
                    </template>
                    <div class="metadata-content">
                      {{ repository.language }}
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <template #header>
                      <div class="metadata-header">
                        <el-icon><Star /></el-icon>
                        <span>星标数</span>
                      </div>
                    </template>
                    <div class="metadata-content">
                      {{ repository.stars }}
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card shadow="hover">
                    <template #header>
                      <div class="metadata-header">
                        <el-icon><Link /></el-icon>
                        <span>仓库链接</span>
                      </div>
                    </template>
                    <div class="metadata-content">
                      <el-link :href="repository.repo_path" target="_blank" type="primary">
                        在 GitHub 上查看
                      </el-link>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <div class="files-section">
              <h3>文件列表</h3>
              <el-table :data="files" style="width: 100%">
                <el-table-column prop="name" label="文件名">
                  <template #default="scope">
                    <el-icon><Document /></el-icon>
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="120">
                  <template #default="scope">
                    <el-tag size="small">{{ scope.row.type }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="size" label="大小" width="120" />
              </el-table>
            </div>
          </div>
        </el-card>
      </template>
      <el-empty v-else description="未找到仓库" />
    </el-main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { 
  Document, 
  CollectionTag, 
  Star, 
  Link,
  ArrowLeft 
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const loading = ref(true)
const repository = ref(null)
const files = ref([])

const fetchRepositoryDetails = async () => {
  try {
    const repoPath = decodeURIComponent(route.params.id)
    const response = await axios.get(`http://127.0.0.1:8000/repository/${repoPath}`)
    repository.value = response.data.repository
    files.value = response.data.files
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => {
  fetchRepositoryDetails()
})
</script>

<style scoped>
.detail-container {
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

.detail-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.description {
  margin-bottom: 20px;
}

.description h3 {
  margin-bottom: 10px;
}

.metadata-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metadata-content {
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
}

.files-section {
  margin-top: 20px;
}

.files-section h3 {
  margin-bottom: 16px;
}
</style> 