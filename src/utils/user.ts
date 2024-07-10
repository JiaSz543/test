import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 后端服务的主机和端口
  timeout: 10000, // 请求超时时间
  headers: { 'Content-Type': 'application/json' }, // 请求头配置
});
