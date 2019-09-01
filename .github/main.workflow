workflow "Eslint" {
  on = "push"
  resolves = ["ESLint"]
}

action "ESLint" {
  uses = "stefanoeb/eslint-action@master"
}