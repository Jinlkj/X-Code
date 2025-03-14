<template>
  <el-row>
    <el-col :span="21">
      <el-input v-model="input" style="width: 100%" placeholder="Please input" />
    </el-col>
    <el-col :span="3">
      <el-button @click="handleSearch">
        <el-icon>
          <Search />
        </el-icon>
      </el-button>
    </el-col>
  </el-row>
  <div v-if="results.length === 0">
    <el-empty description="description" />
  </div>
  <el-link v-for="item in results" :key="item.repo_path" :href="item.repo_path" style="display: block; margin-bottom: 10px;width: 1000px;" :underline="false">
    <div>
      <el-card shadow="hover">
      <el-row>
        <el-space>
          <el-text size="large" type="primary">
            {{ item.repo_name }}
            <el-tag style="position: relative; top: -2px;">
              <el-icon>
                <Document />
              </el-icon>
              <a style="position: relative; top: -1px;">{{ item.license }}</a>
            </el-tag>
          </el-text>
        </el-space>
      </el-row>
      <el-row style="position: relative; top: -8px;" width="100%">
        <el-col :span="24">
          <el-text truncated>
            {{ item.highlight }}
          </el-text>
        </el-col>
      </el-row>
      <el-row style="position: relative; bottom: -10px;">
        <el-space>
          <el-col>
            <el-icon>
              <CollectionTag />
            </el-icon>
            <a style="position: relative; top: -2px;">{{ item.language }}</a>
          </el-col>
          <el-col>
            <el-icon>
              <Star />
            </el-icon>
            <a style="position: relative; top: -2px;">{{ item.stars }}</a>
          </el-col>
        </el-space>
      </el-row>
    </el-card>
    </div>
  </el-link>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Search, Document, CollectionTag, Star } from '@element-plus/icons-vue'

const input = ref('')
const results = ref([])

const handleSearch = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/search', {
      query: input.value
    })
    console.log(response.data)
    results.value = response.data.map(item => ({
      license: item.license,
      stars: item.stars,
      highlight: item.highlight,
      repo_name: item.repo_name,
      repo_path: item.repo_path,
      language: item.language,
    }))
    console.log(results.value)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>