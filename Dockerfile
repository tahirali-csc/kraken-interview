FROM node:16.15
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

COPY services /home/app/services
COPY db.mjs /home/app/
COPY index.js /home/app/

RUN npm install

ENTRYPOINT [ "npm" ,"run", "start"]