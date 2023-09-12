# MD-LINKS
## 1. Introdução
Markdown Links, muitas vezes referido como **MD-Links**, é uma ferramenta ou biblioteca que permite extrair e analisar os links presentes em arquivos Markdown (.md). Arquivos Markdown são frequentemente usados para escrever documentação, artigos, posts de blogs e até mesmo páginas da web, devido à sua formatação simples e fácil de ler.


O MD-Links permite que você extraia automaticamente os links dentro de arquivos Markdown e, em alguns casos, também verifique a validade desses links, ou seja, se eles ainda estão acessíveis na web. Isso é particularmente útil para garantir que todos os links em sua documentação ou conteúdo online estejam funcionando corretamente.


*A ferramenta MD-Links pode oferecer as seguintes funcionalidades:*


1. 📎 **Extração de Links:** A ferramenta percorre os arquivos Markdown e identifica todos os links presentes no formato markdown.


2. 🔍 **Validação de Links:** A ferramenta pode opcionalmente verificar a validade dos links, fazendo solicitações HTTP para cada URL e verificando se o link está acessível ou quebrado.


3. 📊 **Estatísticas de Links:** A ferramenta pode fornecer estatísticas sobre os links encontrados nos arquivos, como o número total de links, o número de links únicos e o número de links quebrados.


A utilidade do MD-Links é facilitar o processo de gerenciamento de links em seus arquivos Markdown, economizando tempo e garantindo que seus documentos mantenham seus links atualizados e funcionando adequadamente.


É importante observar que "Markdown Links" não é um termo padrão, mas é frequentemente usado para descrever ferramentas e bibliotecas que realizam essas funcionalidades específicas relacionadas a links em arquivos Markdown.


## 2. Tecnologias utilizadas
![JAVASCRIPT ICON](https://skillicons.dev/icons?i=js,nodejs,jest,git,vscode)


## 3. Guia de Instalação e Uso
### 3.1 Pré-requisitos
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)


### 3.2 Instalação
1. Abra o terminal.
2. Execute o seguinte comando para instalar o MD-Links globalmente:
```bash
npm install -g md-links-mari
```
### 3.3 Uso


**1. Para extrair links de um arquivo Markdown:**
```bash
md-links caminho/do/arquivo.md
```
**Exemplo de resultado:**


![Extrair links](<src/img/links.png>)


**2. Para extrair e verificar o status HTTP dos links:**


```bash
md-links caminho/do/arquivo.md --validate
```
**Exemplo de resultado:**


![Links validate](<src/img/validate.png>)


**3. Para obter estatísticas sobre os links:**


```bash
md-links caminho/do/arquivo.md --stats
```
**Exemplo de resultado:**


![Link stats](<src/img/stats.png>)


**4. Para obter estatísticas e validar os links:**


```bash
md-links caminho/do/arquivo.md --stats --validate
```
**Exemplo de resultado:**


![Link validate and stats](<src/img/stats-validate.png>)


## 4. Desenvolvedora


### Marina Cordeiro Barbosa


marinacordeiro92@gmail.com


[![LINKEDIN ICON](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/marina-cordeiro-a4b658124/)


## 5. Licença


Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE.txt) para detalhes.