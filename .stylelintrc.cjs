module.exports = {
  ignoreFiles: ["coverage/**/*", "dist/**/*", "node_modules/**/*"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-tailwindcss",
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  customSyntax: "postcss-scss",
  rules: {
    // General
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
    "selector-class-pattern": null,

    // SCSS rules
    "scss/dollar-variable-pattern": "^[_a-z]+[a-z0-9-]*$",
    "scss/load-no-partial-leading-underscore": true,
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "layer",
          "apply",
          "variants",
          "responsive",
          "screen",
          "plugin",
          "custom-variant",
          "theme",
        ],
      },
    ],

    // Formatting
    "declaration-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "no-descending-specificity": null,

    "color-function-notation": "modern",
    "alpha-value-notation": "number",
    "lightness-notation": "number",
    "hue-degree-notation": "number",
    "color-named": "never",
    "max-nesting-depth": 5,

    "order/order": [
      "custom-properties",
      "dollar-variables",
      "declarations",
      "rules",
      "at-rules",
    ],
    "order/properties-alphabetical-order": true,
  },
};
