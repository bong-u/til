# TIL

![example workflow](https://github.com/bong-u/til-hugo/actions/workflows/hugo.yml/badge.svg)


### Command

```bash
# Create container and attach
docker run -it --name til-hugo -p 1313:1313 bongu/til-hugo
# Run in development environment
source serve.sh
```

### Link
* Deploy https://bong-u.github.io/til-hugo
* Develop http://localhost:1313/til-hugo
* Docker Image https://hub.docker.com/repository/docker/bongu/til-hugo

### Dependency
* github-markdown-css : https://cdnjs.com/libraries/github-markdown-css

### Commit Convention
| Type          | Description     |
|---------------|-----------------|
| 📝 new        | New Document    |
| 📝 update     | Update Document |
| 🎨 style      | Style Document  |
