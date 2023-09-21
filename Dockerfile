FROM node:20

WORKDIR .

COPY . .

# Install npm packages
RUN npm install
RUN npm install -g serve

# final config
EXPOSE 3000
CMD ["npm", "run", "deploy"]
