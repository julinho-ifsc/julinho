# julinho

O projeto utiliza o [Flask](http://flask.pocoo.org/) como framework web e o [Orator](https://orator-orm.com/) como base para realizar todas as operações de manipulação do banco de dados.

## Índice
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Migrations](#migrations)
- [Seeds](#seeds)
- [Contribuir](#contribuir)
- [Licença](#licença)

## Instalação
Este projeto usa [python 3](https://www.python.org/), [nodejs 8](https://nodejs.org/), [npm](https://www.npmjs.com/) e [mysql](https://www.mysql.com/).
Tenha certeza de ter eles instalados corretamente antes de prosseguir.

Instale as dependências necessárias para no projeto com o seguinte comando:

```sh
$ pip install -r requirements.txt
$ npm install
```

Crie na raiz do projeto um arquivo `.env` com as suas credenciais de acesso ao banco de dados e definindo qual ambiente o projeto rodará.
Você pode usar o arquivo [`.env.example`](.env.example) como base para criar o seu.

Acesse o mysql pela linha de comando:

```sh
$ mysql -u <NOME_DE_USUARIO> -p
```

Crie uma banco de dados com o nome `julinho` ou outro da sua preferência:

```sql
CREATE DATABASE julinho;
```

Rode as migrations:

```sh
$ python run.py migrate
```

Rode os seeds:

```sh
$ python run.py seed
```

## Utilização

Depois de tudo instalado rode o seguinte comando na linha de comando para iniciar o servidor na porta `5000`, e iniciar o [webpack](https://webpack.js.org/) em [modo watch](https://webpack.js.org/configuration/watch/).

```sh
$ npm run build:watch
$ python run.py server
```

Agora a aplicação está disponível em [`localhost:5000`](http://localhost:5000).

## Migrations

Migrations são um tipo de controle de versão para o banco de dados. Elas permitem que as suas modificações  feitas no banco de dados sejam feitas também no banco de dados dos outro contribuidores. Dessa forma todas conseguem ter uma versão atualizado e correta do banco de dados.

O projeto utiliza o [orator](https://orator-orm.com/) para [gerenciar as migrations](https://orator-orm.com/docs/0.9/migrations.html).

### Criando migrations

Para criar uma migration rode na linha de comando:

```sh
$ python run.py make:migration <nome_da_migration>
```

Depois de feito isso, procure o arquivo criado em `server/migrations` que contém a sua nova migration e programe as modificações desejadas no banco de dados.

### Rodando migrations

Para rodar as migrations existem rode na linha de comando:

```sh
$ python run.py migrate
```

## Seeds

Seeds são os dados iniciais que um banco de dados precisa ter para que o desenvolvimento da aplicação.

O projeto utiliza o [orator](https://orator-orm.com/) para [gerenciar as seeds](https://orator-orm.com/docs/0.9/seeding.html).

## Criando seeds

Para criar um seed rode na linha de comando:

```sh
$ python run.py make:seed <nome_do_seed>
```

Depois de feito isso, procure o arquivo criado em `server/seeds` que contém o seu novo seed e programe as modificações desejadas no banco de dados.

### Rodando um seed

Para rodar apenas um seed rode na linha de comando:

```sh
$ python run.py seed <nome_do_seed>
```

### Rodando todos os seeds

Para rodar todas os seeds existentes rode na linha de comando:

```sh
$ python run.py seed:all
```
*Nota: Tenha cuidado ao rodar esse comando, porque caso algum dado já exista em seu banco de dados, é provável que ele será duplicado após o comando ser executado.*

## Contribuir
*Nota: As instruções a seguir se aplicam aos membros do projeto. Caso você não faça parte da organização os passos são basicamente os mesmos, a única diferença é que você deve primeiro fazer um fork do projeto e fazer as suas modificações no fork antes de fazer um pull request.*

- Clone o repositório: `git clone https://github.com/julinho-ifsc/julinho`
- Navegue até o diretório que acabou de ser clonado: `cd julinho`
- Crie um novo branch para a nova funcionalidade: `git checkout -b my-new-feature`
- Instale as ferramentas necessárias para o desenvolvimento: Siga os passos da seção [Instalação](#instalação).
- Faça as suas alterações.
- Faça o commit de suas alterações: `git commit -am 'Add some feature'`
- Faça um push do branch: `git push origin my-new-feature`
- Faça um pull request do seu branch para o branch master.

Caso prefira você pode também fazer o merge do seu branch com o master:

```sh
$ git checkout master
$ git merge my-new-feature
$ git push origin master
```

## Licença

[MIT license](LICENSE)
