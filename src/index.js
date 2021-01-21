import axios from 'axios';

class App {
    constructor() {
        this.urlPersonagens = `http://localhost:3001/personagens`
        this.dados = [];
        this.registrosPorPagina = 100;

        this.buscarDados(1);
    }


    buscarDados(pagina) {

        axios.get(this.urlPersonagens + `?pagina=${pagina}&registros=${this.registrosPorPagina}`)
            .then(response => {

                this.mostrarCards(response.data.data.results);
                this.setPagination(response.data.data.total);
            });



    }

    buscarPorFiltro(event) {
        axios.get(this.url + `&namestartsWith=${this.searchTxt.value}`)
            .then(response => {
                this.showData(response.data.results);
                this.setPagination(response.data.total);
            })
    }

    buscarPersonagem(event) {

        const id = +event.path[1].dataset.id;
        console.log(id);

        axios.get(this.urlPersonagens + `/${id}`)
            .then(response => {
                console.log("retorno", response);
                let personagem = response.data.data.results[0];
                console.log("personagem", personagem);

                document.getElementById("cards").style.display = "none";
                document.getElementById("pagination").style.display = "none";
                document.getElementById("detalhes").style.display = "block";
                let html = "";
                html += `
                <div class="row no-gutters">
                    <img id="imgVertical" class="col-md-4" 
                        src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}" alt="...">
                    
                    <div id="detalhesVertical" class="col-md-8">
                    <h3>Nome: ${personagem.name}</h3>
                    <h5>Descrição: ${personagem.description}</h5>
                    
                    
                    </div>
                </div>
                `;
                document.getElementById("detalhes").innerHTML += html;
            });



    }

    setPagination(totalItens) {
        const paginas = Math.ceil(totalItens / this.registrosPorPagina);

        document.querySelector('.pagination').innerHTML = "";

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

    mostrarCards(dados) {

        let html = "";
        dados.forEach(personagem => {
            html += `
                    <div class="card">
                        <a href="#" class="btn btn-dark page-id" data-id="${personagem.id}">
                            <img src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}"  class="card-img-top image" alt="...">
                        </a>
                        
                        <div class="middle">
                            <div class="text">
                                ${personagem.name}
                            </div>
                        </div>
                    </div>
                    `;
        });

        document.getElementById("cards").innerHTML = html;

        document.querySelectorAll('.page-id').forEach((el) => {
            el.onclick = (event) => this.buscarPersonagem(event);
        });

    }
}

new App;