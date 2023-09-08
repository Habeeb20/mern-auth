import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


server: {
  https: {localhost: 3000}
}
export default defineConfig({
  plugins: [react()],
})
