FROM node:6-onbuild
EXPOSE 8888

RUN npm run preinstall
RUN gulp
