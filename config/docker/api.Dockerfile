FROM node:16-alpine

LABEL maintainer="hello@touca.io"
LABEL org.opencontainers.image.title="touca-api"
LABEL org.opencontainers.image.description="Touca API"
LABEL org.opencontainers.image.url="https://api.touca.io/"
LABEL org.opencontainers.image.documentation="https://touca.io/docs"
LABEL org.opencontainers.image.vendor="Touca, Inc."
LABEL org.opencontainers.image.authors="hello@touca.io"

COPY api/certs                      /opt/touca/api/certs
COPY api/dist                       /opt/touca/api/dist
COPY api/env                        /opt/touca/api/env
COPY api/samples                    /opt/touca/api/samples
COPY api/node_modules               /opt/touca/api/node_modules
COPY node_modules                   /opt/touca/node_modules
COPY packages                       /opt/touca/packages

EXPOSE 8081

CMD ["node", "/opt/touca/api/dist/server.js"]
