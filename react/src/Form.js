import React, { Component } from 'react';
import close from './close.svg';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            card_field: JSON.parse(localStorage.getItem('card_field')) || [],
            colorVal: ''
        };
    }

    handlerChanges = e => {
        this.setState({   //записывает каждый раз изменения поля ввода в локальный state
            colorVal: e.target.value   // тагрет ссылается на текущий элемент (.target)
        });
    };

    addCard = () => {    //карточку тадо запихнуть в стейт и локал storage
        const { colorVal, card_field } = this.state;

        card_field.unshift({   //аншифт добавляет элемент в начало массива
            colorCard: colorVal,
            likeVal: false,
            hash: +new Date()
        });

        this.setState({
            card_field: card_field,
            colorVal: ''
        });

        localStorage.removeItem('card_field');
        localStorage.setItem('card_field', JSON.stringify(card_field));
    };

    changeFav = i => e => {
        const { card_field } = this.state;

        card_field[i].likeVal = !card_field[i].likeVal;

        localStorage.removeItem('card_field');
        localStorage.setItem('card_field',JSON.stringify(card_field));

        this.setState({
            card_field: card_field
        });
    };

    delcard = i => e => {
        const { card_field } = this.state;
        console.log(e);
        card_field.splice(i,1);

        this.setState({
            card_field: card_field
        });

        localStorage.removeItem('card_field');
        localStorage.setItem('card_field',JSON.stringify(card_field));

        this.setState({
            card_field: card_field
        });
    };

    rendercard_field = (card_field, i) => { //верстка карточки
        //каждому диву в реакте нужен обязательный идентификатор. Здесь - key
        return (
            <div key={i} className="col large_25 medium_33 small_100">
                <div className="item">
                    <div className="card_img" style={{backgroundColor: card_field.colorCard}}></div>
                    <p className="color_value">{card_field.colorCard}</p>
                    <input onChange={this.changeFav(i)} className="item_fav" type="checkbox"
                           id={card_field.hash} checked={card_field.likeVal} />
                    <label htmlFor={card_field.hash}></label>
                    <button onClick={this.delcard(i)} type="button" className="item_delete"
                            title="Удалить карточку">
                        <img src={close} alt="close icon" />
                    </button>
                </div>
            </div>
        );
    };

    render() {
        const { card_field, colorVal } = this.state;   //оператор деструктуризации - перенос переменных из объекта в поля

        return (
            <div>
                <h1>Управление карточками</h1>
                <div  className="inputHEX">
                    <input onChange={this.handlerChanges} value={colorVal} className="input" type="text" placeholder="HEX значение"
                           pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$" required />
                    <input onClick={this.addCard} className="button1" type="submit" value="Добавить"/>
                </div>
                <div className="card_field">
                    {
                        card_field.map( (item, i) => ( //мап производит итерацию по массиву
                            this.rendercard_field(item, i)
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Form;