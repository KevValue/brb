FROM node:18-alpine

# remote dir
WORKDIR /usr/src/app

COPY package*.json .
RUN npm i

COPY . .

EXPOSE 3000

## production
## RUN npm run build
## CMD ["npm", "start"]

## development

## EXEC form - last CMD wins - any docker run argument overrides docker file CMD
CMD ["npm", "run", "dev"]

## SHELL form - /bin/sh -c
## CMD npm run dev

## Entrypoint - default executable with CMD args
# ENTRYPOINT ["npm"]
# CMD ["run", "dev"]
