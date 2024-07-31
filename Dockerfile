#https://snyk.io/advisor/docker/node use the least vulnerable package
FROM node:14-buster as builder
RUN mkdir -p /build

COPY ./package.json ./package-lock.json /build/
WORKDIR /build
RUN npm ci

COPY . /build

FROM  node:14-bullseye
ENV user node
USER $user

RUN mkdir -p /home/$user/src
WORKDIR /home/$user/src

COPY --from=builder /build ./

EXPOSE 5000

ENV NODE_ENV development

CMD ["npm", "start"]