
# Docker-compose for mongodb, nodejs and vuejs

Use [docker-compose](https://docs.docker.com/compose/) to start docker containers:

 - database (mongodb)
 - server (nodejs)
 - client (vuejs)

Note:  
* Containers are already set-up to communicate together  
* Edit in the local IDE will automatically be reflected in the apps running in containers   
* App don't manage users authentication system, so bookings aren't link to users    
* It's a real time search engine, just use filters to see which room is available according to your needs (if a room isn't available, you will don't see it in the list)    
            

## Purpose

A docker-compose project to launch 
A simple demo project with mongodb + nodejs + vuejs that is up to use as base for meeting room booking project.


## Prereq

The stuff you need to get going:

    install [docker-machine](https://docs.docker.com/machine/) (OSX)
    install [docker-compose](https://docs.docker.com/compose/)
    git clone <this project>
        
Note: You do not need nodejs, vuejs or mongodb installed on your host machine. It's all installed in the docker containers.    
    

## Manage dockers with docker-compose

Using [docker-compose config file](./docker-compose.yml). List dockers, bring them up, down...

    docker-compose ps
    docker-compose up
    docker-compose down


## Access services

open web browser to server (nodejs):

    open http://localhost:3000
    
open web browser to client (vuejs):    
    
    open http://localhost:8080
    
    
