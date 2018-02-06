node {

  docker_file = "Dockerfile"

  tokens = "${env.JOB_NAME}".tokenize('/')
  org = tokens[0]
  repo = tokens[1]
  branch = "${env.BRANCH_NAME}"
  imageBasename = "${org}/${repo}"
  tagName = "${branch}"

  stage('checkout'){
    checkout scm
  }

  stage('build') {
    sh "docker build -t ${imageBasename} -f ${docker_file} ."
    image = docker.image(imageBasename)
  }

  stage('push'){
    image.push("${tagName}")
  }
}
