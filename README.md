# Recommendation system database model

Modelagem e implementação de um banco de dados orientado a documentos (mongodb) para um sistema de recomendação fictício.

## O que tem neste repo?
 - Tem um drawio com uma arquitetura geral do fluxo de recomendação e o a modelagem conceitual, lógica e física do sistema de recomendação;
 - Tem um docker-compose para subir um mongodb com a implementação do modelo físico citado;

## Subindo o banco de dados

> Nota: Para subir o banco de dados é necessário ter o Docker e Docker 
> Compose instalados e configurados.

Executar o comando: `docker compose up -d` para subir os container

## Acessando os dados

É possível interagir com mongodb pelo mongo-express. É possível acessá-lo pelo browser na url 
`http://localhost:8081`. O usuário e a senha estão presentes no docker-compose.yml (user: `user`, password: `pass`).
O database criado se chama `rec_system_db`. 
