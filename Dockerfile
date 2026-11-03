FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY . .
RUN pnpm install
RUN MONGODB_URI=mongodb://x DB_NAME=x ADMIN_PASSWORD=x pnpm run build

EXPOSE 3008
ENV PORT=3008

CMD [ "node", "build/" ]