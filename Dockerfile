#https://snyk.io/advisor/docker/node use the least vulnerable package
FROM node:current-buster as builder
RUN mkdir -p /build

COPY ./package.json ./package-lock.json /build/
WORKDIR /build
RUN npm ci

COPY . /build

FROM  node:18.6.0-slim 
ENV user node
USER $user

RUN mkdir -p /home/$user/src
WORKDIR /home/$user/src

COPY --from=builder /build ./

EXPOSE 5000

ENV NODE_ENV development

CMD ["npm", "start"]