import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Emit version.json and inject build version into index.html so Chrome/cached clients get latest app
    {
      name: 'emit-version',
      closeBundle() {
        try {
          const version = Date.now()
          const dist = join(process.cwd(), 'dist')
          writeFileSync(
            join(dist, 'version.json'),
            JSON.stringify({ version }),
            'utf-8'
          )
          const indexPath = join(dist, 'index.html')
          let html = readFileSync(indexPath, 'utf-8')
          if (!html.includes('__BUILD_VERSION__')) {
            const versionScript = `<script>window.__BUILD_VERSION__=${version}</script>
    <script>(function(){var v=window.__BUILD_VERSION__;if(typeof v==="undefined")return;fetch("/version.json?b="+Date.now(),{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(d){if(d&&d.version!=null&&d.version!==v)window.location.reload();}).catch(function(){});})();</script>`
            html = html.replace('</head>', versionScript + '\n  </head>')
            writeFileSync(indexPath, html, 'utf-8')
          }
        } catch (_) {}
      },
    },
  ],
  server: {
    port: 5173,
    open: true,
  },
})
