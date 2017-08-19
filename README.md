# julinho

## Índice
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Licença](#licença)

## Instalação
Este projeto usa [python 3](https://www.python.org/) e [mysql](https://www.mysql.com/).
Tenha certeza de ter eles instalados corretamente antes de prosseguir.

Instale as dependências necessárias para no projeto com o seguinte comando:

```sh
$ pip install -r requirements.txt
```

Crie na raiz do projeto um arquivo `.env` com as suas credenciais de acesso ao banco de dados e definindo qual ambiente o projeto rodará.
Você pode usar o arquivo [`.env.example`](.env.example) como base para criar o seu.

## Utilização

Depois de tudo instalado rode o seguinte comando na linha de comando para iniciar o servidor na porta `5000`.

```sh
$ python run.py server
```

Agora a aplicação está disponível em [`localhost:5000`](http://localhost:5000).

## Licença

[MIT license](LICENSE)
