// PM2 Ecosystem Configuration
module.exports = {
  apps: [{
    name: 'todo-app',
    script: 'npm',
    args: 'start',
    instances: 1, // Veya 'max' CPU sayısına göre
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
}


