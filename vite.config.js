import reactRefresh from "@vitejs/plugin-react-refresh"

const config = {
  root: "src/app",
  plugins: [
    reactRefresh()
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "mainWindow.html"
      }
    }
  }
}

export default config
