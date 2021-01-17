import axios from 'axios';

class App {
    constructor() {
        this.urlPersonagens = `http://localhost:3333/characters`
        this.dados = [];
        this.registrosPorPagina = 50;

        this.buscarDados(1);
    }


    buscarDados(pagina) {

        /*axios.get(this.urlPersonagens)
            .then(response => {
                console.log(response);
                this.mostrarDados(response.data.results);
                this.setPagination(response.data.total);
            });*/
        axios.get(this.urlPersonagens)
            .then(response => {
                console.log(response.data);
                this.mostrarDados(response.data.data.results);
                this.setPagination(response.data.data.total);
            });

    }

    setPagination(totalItens) {
        const paginas = Math.ceil(totalItens / this.registrosPorPagina);

        for (let i = 1; i <= paginas; i++) {
            const li = `
                        <li class="page-item">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                        </li>
                        `
            document.querySelector('.pagination').innerHTML += li;
        }

        document.querySelectorAll('.page-link').forEach((el) => {
            el.onclick = (event) => this.trocarPagina(event);
        });
    }

    trocarPagina(event) {
        console.log(event.path);
        const pagina = +event.path[0].dataset.page;
        console.log(pagina);
        this.buscarDados(pagina);
    }

    mostrarDados(dados) {

        let html = "";
        dados.forEach(personagem => {
            html += `
                    <div class="card" style="width: 18rem;">
                        <img src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}"  class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${personagem.name}</h5>
                            <p class="card-text">${personagem.description}</p>
                            <a href="/characters/${personagem.id}" class="btn btn-primary">Saiba mais</a>
                        </div>
                    </div>
                    `;
            /*<tr>
                <td>${personagem.id}</td>
                <td>${personagem.name}</td>
                <td>${personagem.description}</td>
                <td><img src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}" width="100"></td>
            </tr>
            `;*/
        });

        document.getElementById("cards").innerHTML = html;
        //document.querySelector(".table tbody").innerHTML = html;
    }
}

new App;