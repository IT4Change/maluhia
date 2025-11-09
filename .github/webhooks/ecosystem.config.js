module.exports = {
  apps: [{
    name: "frontend",
    script: ".output/server/index.mjs",
    node_args: "-r dotenv/config",
    env_file: ".env" 
  }]
}