import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

// ==============================================
class MusicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musics: [],
            value: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Monta o component na inicialização
    componentDidMount() {

    }

    //Altera os dados digitados para LowerCase para passá-los na url 
    handleChange(e) {
        this.setState({value: e.target.value.toLowerCase()});
    }

    //Chama a API atraves do valor passado no input
    handleSubmit (e) {
        this.setState({value: e.target.value});

        const url = 'https://itunes.apple.com/search?term=' + this.state.value + '&kind=song&limit=10';
        axios.get(url).then(response => response.data).then((data) => { 
            this.setState({musics: data.results})

            //Exibe a quantidade de resultados obtidos de acordo com o tamanho do array, caso não encontre nada será 0 :
            this.setState({cont: this.state.musics.length})     
        })
        e.preventDefault();
    }

    render(){
        return(
            <div className="box">

                <h1>Search Musics - iTunes</h1>

                <div className="form">
                    <form onSubmit={this.handleSubmit}> 
                        <input type="text" onChange={this.handleChange} placeholder="Procurar ..." />
                        <input type="submit" value="Buscar" className="button"/>
                    </form>
                </div>

                <p>Músicas encontradas: {this.state.cont}</p>
                <hr />

                <div className="showList">
                    {this.state.musics.map((music) => (
                        <p key={music.trackId}>
                            {music.trackName}
                        </p>
                        ) 
                    )}
                </div>

                <hr />
                <p>Created by <strong>Walter Merscher</strong></p>
            </div>
        );
    }
}

// ==============================================
ReactDOM.render(<MusicList />, document.getElementById('root'));