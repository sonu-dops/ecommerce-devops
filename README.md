# End-to-End DevOps E-Commerce Project

An end-to-end DevOps project demonstrating automated CI/CD deployment of a containerized full-stack e-commerce application to Amazon EKS using Jenkins, Docker, Docker Hub, Kubernetes, PostgreSQL, and AWS EBS.

## Architecture

Developer
   |
   v
GitHub Repository
   |
   v
Jenkins CI/CD
   |
   +--> Build Frontend Docker Image
   |
   +--> Build Backend Docker Image
   |
   v
Docker Hub
   |
   v
Amazon EKS
   |
   +--> Frontend Deployment
   |
   +--> Backend Deployment
   |
   +--> PostgreSQL Deployment
            |
            v
       AWS EBS gp3
       Persistent Volume

The frontend is exposed publicly using an AWS LoadBalancer service.

## Technologies Used

- Git & GitHub
- Jenkins
- Docker
- Docker Compose
- Docker Hub
- AWS EC2
- AWS IAM
- AWS EKS
- eksctl
- Kubernetes
- AWS EBS CSI Driver
- PostgreSQL
- Node.js
- Frontend web application

## CI/CD Pipeline

The Jenkins pipeline automates the deployment process:

1. Checkout source code from GitHub.
2. Build frontend and backend Docker images.
3. Tag images using the Jenkins build number.
4. Authenticate with Docker Hub.
5. Push Docker images to Docker Hub.
6. Configure access to the Amazon EKS cluster.
7. Apply Kubernetes manifests.
8. Update frontend and backend deployments with the new image versions.
9. Wait for Kubernetes rollouts to complete.
10. Verify pods, services, and persistent storage.

Pipeline flow:

GitHub -> Jenkins -> Docker -> Docker Hub -> Amazon EKS -> Kubernetes

## Kubernetes Architecture

The application runs in the `ecommerce` namespace.

### Frontend

The frontend runs as a Kubernetes Deployment and is exposed through a Service of type `LoadBalancer`.

### Backend

The backend runs as a Kubernetes Deployment and communicates internally with PostgreSQL using Kubernetes service discovery.

### PostgreSQL

PostgreSQL runs inside Kubernetes and stores database data on persistent AWS EBS storage.

The database uses:

- AWS EBS CSI Driver
- gp3 StorageClass
- PersistentVolumeClaim
- 2 GiB persistent volume
- ReadWriteOnce access mode

`PGDATA` is configured to use a subdirectory of the EBS mount point.

## AWS Infrastructure

The project uses:

- Amazon EKS for Kubernetes
- EC2 worker nodes
- AWS IAM roles for Jenkins/EKS access
- Amazon EBS gp3 for PostgreSQL persistence
- AWS Elastic Load Balancing for public frontend access
- EKS Pod Identity components
- Amazon VPC CNI networking

## Jenkins AWS Authentication

Jenkins runs on EC2 using an IAM role rather than storing long-lived AWS credentials for deployment.

The Jenkins EC2 instance assumes:

`JenkinsEKSRole`

The role is authorized to communicate with the EKS cluster.

## Docker Images

Docker Hub repositories:

- `sonukr03/ecommerce-frontend`
- `sonukr03/ecommerce-backend`

Jenkins publishes both `latest` and build-number image tags.

Example:

`sonukr03/ecommerce-backend:15`

Using immutable build-number tags allows each deployment to be associated with a specific Jenkins build.

## Kubernetes Manifests

Kubernetes configuration is stored in the `k8s/` directory and includes resources for:

- Namespace
- Frontend Deployment and Service
- Backend Deployment and Service
- PostgreSQL Deployment and Service
- ConfigMap
- Secret
- PersistentVolumeClaim
- StorageClass

## Deployment Verification

Useful commands:

```bash
kubectl get nodes

kubectl get pods -n ecommerce

kubectl get svc -n ecommerce

kubectl get pvc -n ecommerce
