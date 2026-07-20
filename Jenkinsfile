pipeline {
    agent any

   environment {
    FRONTEND_IMAGE = "sonukr03/ecommerce-frontend"
    BACKEND_IMAGE = "sonukr03/ecommerce-backend"
}

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sonu-dops/ecommerce-devops.git'
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend Install') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Push Docker Images') {
            steps {
                withDockerRegistry(
                    credentialsId: 'dockerhub',
                    url: ''
                ) {

                    sh 'docker push $BACKEND_IMAGE'
                    sh 'docker push $FRONTEND_IMAGE'

                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }

    }
}