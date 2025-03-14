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
  <el-row>
    <el-col :span="24">
      <el-text>some introduction</el-text>
    </el-col>
  </el-row>
  <el-space direction="vertical" width="100%">
    <el-link v-for="i in 3" :key="i" href="www.google.com">
      <el-card shadow="hover">
        <el-row>
          <el-space>
            <el-text size="large" type="primary">
              Repository Name
              <el-tag style="position: relative; top: -2px;">
                <el-icon>
                  <Document />
                </el-icon>
                <a style="position: relative; top: -1px;">MIT</a>
              </el-tag>
            </el-text>
          </el-space>
        </el-row>
        <el-row style="position: relative; top: -8px;" width="100%">
          <el-col :span="24">
            <el-text truncated>
              Native ZooKeeper client for Go. This project is no longer maintained.use
            </el-text>
          </el-col>
        </el-row>
        <el-row style="position: relative; bottom: -10px;">
          <el-space>
            <el-col>
              <el-icon>
                <CollectionTag />
              </el-icon>
              <a style="position: relative; top: -2px;">Java</a>
            </el-col>
            <el-col>
              <el-icon>
                <Star />
              </el-icon>
              <a style="position: relative; top: -2px;">123</a>
            </el-col>
          </el-space>
        </el-row>
      </el-card>
    </el-link>
  </el-space>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Search, Document, CollectionTag, Star } from '@element-plus/icons-vue'

const input = ref('')

const handleSearch = async () => {
  try {
    const response = await axios.get('http://9.134.118.234:9200/',
      {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-HK;q=0.6',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        },
      }
    )
    console.log('Response:', response.data)
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