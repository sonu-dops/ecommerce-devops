pipeline {

    agent any

    environment {
        DOCKERHUB_USERNAME = 'sonukr03'
        AWS_REGION = 'eu-north-1'
        EKS_CLUSTER = 'ecommerce-cluster'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build -t ${DOCKERHUB_USERNAME}/ecommerce-backend:${BUILD_NUMBER} ./backend
                    docker build -t ${DOCKERHUB_USERNAME}/ecommerce-frontend:${BUILD_NUMBER} ./frontend

                    docker tag ${DOCKERHUB_USERNAME}/ecommerce-backend:${BUILD_NUMBER} ${DOCKERHUB_USERNAME}/ecommerce-backend:latest
                    docker tag ${DOCKERHUB_USERNAME}/ecommerce-frontend:${BUILD_NUMBER} ${DOCKERHUB_USERNAME}/ecommerce-frontend:latest
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USER" --password-stdin

                        docker push ${DOCKERHUB_USERNAME}/ecommerce-backend:${BUILD_NUMBER}
                        docker push ${DOCKERHUB_USERNAME}/ecommerce-frontend:${BUILD_NUMBER}

                        docker push ${DOCKERHUB_USERNAME}/ecommerce-backend:latest
                        docker push ${DOCKERHUB_USERNAME}/ecommerce-frontend:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Configure EKS') {
            steps {
                sh '''
                    aws eks update-kubeconfig \
                      --region ${AWS_REGION} \
                      --name ${EKS_CLUSTER}

                    kubectl get nodes
                '''
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                    kubectl apply -f k8s/namespace.yaml

                    kubectl apply -f k8s/storageclass.yaml
                    kubectl apply -f k8s/configmap.yaml
                    kubectl apply -f k8s/secret.yaml
                    kubectl apply -f k8s/postgres.yaml
                    kubectl apply -f k8s/backend.yaml
                    kubectl apply -f k8s/frontend.yaml

                    kubectl set image deployment/backend \
                      backend=${DOCKERHUB_USERNAME}/ecommerce-backend:${BUILD_NUMBER} \
                      -n ecommerce

                    kubectl set image deployment/frontend \
                      frontend=${DOCKERHUB_USERNAME}/ecommerce-frontend:${BUILD_NUMBER} \
                      -n ecommerce
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl rollout status deployment/backend \
                      -n ecommerce --timeout=180s

                    kubectl rollout status deployment/frontend \
                      -n ecommerce --timeout=180s

                    kubectl rollout status deployment/postgres \
                      -n ecommerce --timeout=180s

                    kubectl get pods -n ecommerce
                    kubectl get svc -n ecommerce
                    kubectl get pvc -n ecommerce
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD deployment to EKS completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the failed Jenkins stage.'
        }
    }
}
