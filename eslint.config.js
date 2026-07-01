module.exports = [
  {
    ignores: [".next", "node_modules", ".git", "dist", "build"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        React: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
];
