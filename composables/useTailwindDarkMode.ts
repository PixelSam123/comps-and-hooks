import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

function useTailwindDarkMode(): [Ref<string | null>, () => void] {
  const isDarkModeString = ref(
    typeof window !== undefined ? localStorage.getItem('darkMode') : 'false'
  )

  function toggleDarkMode() {
    isDarkModeString.value =
      isDarkModeString.value === 'true' ? 'false' : 'true'
  }

  watchEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.className = isDarkModeString.value === 'true' ? 'dark' : ''
  })

  if (typeof window !== undefined) {
    window.onbeforeunload = () => {
      localStorage.setItem('darkMode', String(isDarkModeString.value))
    }
  }

  return [isDarkModeString, toggleDarkMode]
}

export default useTailwindDarkMode
