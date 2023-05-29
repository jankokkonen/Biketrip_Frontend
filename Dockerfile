FROM node:16 AS production

WORKDIR /Biketrip_Frontend

COPY package.json package-lock.json* ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

CMD ng serve --host 0.0.0.0 --port 4200