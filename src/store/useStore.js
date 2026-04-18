import { create } from 'zustand'

const useStore = create((set) => ({
  isDark: true,
  activeSection: 'home',
  toggleTheme: () =>
    set((state) => {
      const isDark = !state.isDark
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
      return { isDark }
    }),
  setActiveSection: (section) => set({ activeSection: section }),
}))

export default useStore
