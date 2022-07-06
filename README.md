Base project demonstrating prometheus scraping from openresty


To try it out:
```
docker-compose build
docker-compose up
```


## Kubernetes

Applying kustomize:
```
eval $(minikube docker-env)

# build all the images
docker-compose build

kustomize build ./kustomize | kubectl apply -f -
```

Accessing openresty load balancer:
```
minikube tunnel
```
Then open browser to http://localhost