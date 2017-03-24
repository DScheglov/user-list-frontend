FROM node:6-onbuild
EXPOSE 8888

RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm run preinstall
RUN npm run prestart
