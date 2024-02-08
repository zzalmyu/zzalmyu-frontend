module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 100],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["Feat", "Fix", "Docs", "Style", "Refactor", "Test", "Chore", "Modify", "Rename", "Cleanup", "Merge"],
    ],
  },
};
