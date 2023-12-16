module.exports = {
  endOfLine: "auto",
  printWidth: 120,
  semi: false,
  trailingComma: "es5",
  quoteProps: "consistent",
  // pnpm doesn't support plugin autoloading
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss#installation
  plugins: [require("prettier-plugin-tailwindcss")],
}
