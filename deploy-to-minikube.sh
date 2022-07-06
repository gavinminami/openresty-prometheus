#!/bin/bash

eval $(minikube docker-env)

# build all the images
docker-compose build

kustomize build ./kustomize | kubectl apply -f -