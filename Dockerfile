FROM node:22-alpine as build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código
COPY . .

# Faz o build da aplicação para produção
RUN npm run build

# Estágio do servidor web NGINX
FROM nginx:alpine

# Copia os arquivos de build para a pasta pública do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração customizada do NGINX (para SPA / rotas do React)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]
