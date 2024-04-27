FROM oven/bun:latest

COPY settings.json ./
COPY package.json ./
COPY index.tsx ./
RUN bun install
EXPOSE 3000/tcp

CMD [ "bun", "run", "index.tsx" ]

