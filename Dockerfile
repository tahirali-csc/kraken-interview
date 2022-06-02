FROM node:16.15.1
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

COPY . /home/app

ENTRYPOINT [ "npm" ,"run", "start"]