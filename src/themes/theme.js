BF3131
export const getTheme = () => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return theme.theme.dark
    }
    return theme.theme.light
  }
  
  export const theme = {
    light: {
      text: '#233142', // change this
      border: '#5A5A5A', // change this
      primary: '#5586ee',
      primaryHover: '#7D0A0A', // change this
      primaryBackground: '#f2f5ff',
      secondaryBackground: '#FFFFFF',
      error: '#DC3545',
      errorBackground: '#F8D7DA',
      success: '#28A745',
      successBackground: '#D4EDDA',
      warning: '#FFC107',
      warningBackground: '#FFF3CD',
      neutral: '#6C757D',
      neutralBackground: '#E2E3E5',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      text: '#F9F7F7',
      border: '#333333',
      primary: '#BF3131',
      primaryHover: '#7D0A0A',
      primaryBackground: '#233142',
      sidePanelBackground: '#1A1A1A',
      secondaryBackground: '#2A2A2A',
      error: '#FF6B6B',
      errorBackground: '#3B1E1E',
      success: '#28A745',
      successBackground: '#153B24',
      warning: '#FFC107',
      warningBackground: '#4A3A10',
      neutral: '#999999',
      neutralBackground: '#3C3C3C',
      shadow: 'rgba(0, 0, 0, 0.4)',
    }
  };
  
  const applyTheme = (themeName = 'light') => {
    const themeVariables = theme[themeName] || theme.light
    Object.keys(themeVariables).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, themeVariables[key])
    })
  }
  
  export const configureTheme = () => {
    // Apply the default theme based on system preferences
    const themeName = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    applyTheme(themeName)
  
    // Optional: Add a listener for theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        applyTheme(e.matches ? 'dark' : 'light')
      })
  }
  