FROM node:latest

WORKDIR /home/projet

RUN apt-get update

RUN mkdir /home/clone

RUN cd /home/clone && git clone https://github.com/GonoGoat/projetIntegrationGrp6

RUN cp /home/clone/projetIntegrationGrp6/Node.js/* /home/projet -r

RUN npm install pm2 -g
