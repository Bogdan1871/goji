
![Снимок экрана 2025-04-24 221313](https://github.com/user-attachments/assets/3c5af01d-eac9-4642-9ffa-f6857db14572)
![Снимок экрана 2025-04-24 221258](https://github.com/user-attachments/assets/f48bb693-572d-45f8-b3b0-29206a357887)
![Снимок экрана 2025-04-24 221242](https://github.com/user-attachments/assets/2def94ee-6d65-449f-b76e-8280459bb091)
![Снимок экрана 2025-04-24 221221](https://github.com/user-attachments/assets/3bfb4f94-e518-4dd6-82ad-8254c0a08b69)
![Снимок экрана 2025-04-24 221205](https://github.com/user-attachments/assets/14bd4c23-d0bb-40a3-a9b4-0f2ca62c0474)
![Снимок экрана 2025-04-24 221132](https://github.com/user-attachments/assets/cc70dc31-64a5-4a3a-bd26-ae7bd87ece21)
![Снимок экрана 2025-04-24 221104](https://github.com/user-attachments/assets/b0e18f51-7fb5-4dfb-b1ca-7f48dcfce38b)
![Снимок экрана 2025-04-24 221333](https://github.com/user-attachments/assets/aebc650f-6a32-4304-8cff-04a1f4aee660)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
