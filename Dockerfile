FROM node:6-onbuild
EXPOSE 8888

bower install
npm run preinstall
