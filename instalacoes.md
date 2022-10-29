# Criando uma API com Node, Typescript e TypeORM
---
# Instalações:
# 1. npm init -y
# 2. npm i -D typescript nodemon ts-node @types/express @types/node
# 3. npm i express pg typeorm dotenv reflect-metadata (bibliotecas de produção)
# 4. npx tsc --init
---
# Criando as tabelas:
# Depois de configurar o "script" no package.json, digitar a seguinte linha de código: npm run migration:generate (lembrar de rodar esse comando depois de criar a migration)
# Depois de todas as migrations criadas, digitar: npm run migration:run (a mágica acontece)