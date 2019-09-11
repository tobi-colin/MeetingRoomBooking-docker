FROM mongo:4.0.3

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD password
ENV MONGO_INITDB_DATABASE admin

ADD ./mongo-init.js /docker-entrypoint-initdb.d/