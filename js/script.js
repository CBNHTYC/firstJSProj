'use strict';

class Store {

    static saveCard( color, check, name ) {
        let card = name ? name : 'item_' + +new Date();
        let storage = {
            colorCard: color,
            likeInput: 'input_' + card,
            likeVal: check
        };

        let storageSer = JSON.stringify(storage);

        try {
            localStorage.setItem( card, storageSer );
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Память закончилась!');
            }
        }

        return card;
    }

    static setLike( card ) {
        let item = localStorage.getItem(card.id);
        item = JSON.parse(item);
        let input = document.getElementById(item.likeInput);

        this.saveCard( item.colorCard, input.checked, card.id);
    }

    static delCard( card ) {
        card.classList.add('fade-out');
        setTimeout( () =>  {
            localStorage.removeItem( card.id );
        document.querySelector('.card_field').removeChild(card);
    }, 500);
    }

}

window.onload = initApp;

function initApp() {

    const nodeInfo = {
        add: document.querySelector('form'),
        inputColor: document.querySelector('.input'),
        row: document.querySelector('.card_field'),
        keyStorage: Object.keys(localStorage)
    };

    nodeInfo.keyStorage.forEach(function(item) {
        let objItem = JSON.parse(localStorage.getItem( item ));
        addCard( item );
    });

    nodeInfo.inputColor.addEventListener('invalid', function (e) {
        e.target.setCustomValidity('');

        if ( !e.target.validity.valid ) {
            e.target.setCustomValidity('Введите пожалуйста корректный HEX цвет!');
        } else {
            submitColor();
        }
    });

    nodeInfo.inputColor.addEventListener('input', function (e) {
        e.target.setCustomValidity('');
    });

    nodeInfo.add.onsubmit = submitColor;

    function submitColor() {

        let cardName = Store.saveCard( nodeInfo.inputColor.value, false );
        addCard( cardName );
        nodeInfo.inputColor.value = '';

        return false;
    }

    function addCard( cardName ) {

        let cardObj = localStorage.getItem( cardName );
        cardObj = JSON.parse( cardObj );

        let check = cardObj.likeVal ? 'checked' : '';

        let wrap = document.createElement('div');

        wrap.id = cardName;
        wrap.className = 'col large_25 medium_33 small_100';

        let item = document.createElement('div');
        item.className = 'item';

        item.innerHTML = `<div class="card_img" style="background-color: ${cardObj.colorCard};"></div>
							<p align='center' class="color_value">${cardObj.colorCard}</p>
							<input onchange="Store.setLike(${cardName})" class="item_fav" type="checkbox" id="${cardObj.likeInput}" ${check}>
							<label for="${cardObj.likeInput}"></label>
							<button onclick="Store.delCard(${cardName})" type="button" class="item_delete" title="Удалить карточку">
								<img src="img/close.svg" alt="">
							</button>`;
        wrap.appendChild(item);
        nodeInfo.row.insertBefore(wrap,  nodeInfo.row.firstChild);
    }
}


