#
# ---- Base ----
FROM tislaamo/node:8 AS base
RUN npm config set depth 0 && \
  npm set progress=false
WORKDIR /home/node/app

#
# ---- Build ----
FROM base AS build

# Setup
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

# Build
RUN NODE_ENV=production npm run build

#
# ---- Release ----
FROM kyma/docker-nginx AS release

COPY nginx/default.template /etc/nginx/default.template
COPY nginx/run_nginx.sh /etc/nginx/run_nginx.sh
RUN chmod +x /etc/nginx/run_nginx.sh

COPY --from=build /home/node/app/build /var/www

CMD ["/etc/nginx/run_nginx.sh"]
