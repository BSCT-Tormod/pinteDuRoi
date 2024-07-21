var cardState = 'inactive';
var colors = ['Pique', 'Coeur', 'Carreau', 'Trefle'];
var cardElement = document.querySelector('#active-card');
var drawedCards = [];

const rulesValue = {
    'R': 'Remplis la Pinte du Roi',
    '1': 'Medusa',
    'D': 'Dictateur',
    'V': 'Nouvelle regle',
    '10': 'Copain',
    '9': 'Question piege'
}

const rulesColor = {
    'Pique': 'Donne 2 gorgees',
    'Coeur':  'Theme',
    'Carreau': 'Bois 1 gorgee',
    'Trefle': 'Rime'
}

cardElement.addEventListener('click', function() {
    switch(cardState){
        case 'inactive':
            activateCard();
            break;
        case 'active':
            deactivateCard();
            break;
    }
});

function activateCard(){
    cardState = 'active';
    var card = drawCard();
    cardElement.style.transition = 'ease-out 0.2s';
    cardElement.style.transform = 'translate(-50%, -150%) rotate(0deg)';
    wait(500).then(() => {
        cardElement.style.transition = 'ease 0.1s';
        cardElement.style.transform = 'translate(-50%, -150%) rotate(0deg) scaleX(0)';
        wait(100).then(() => {
            document.querySelector('#active-card img').src = 'img/'+card.color+'.png';
            cardElement.style.transform = 'translate(-50%, -150%) rotate(0deg) scaleX(1)';
            document.querySelector('#card-value').style.transform = 'translate(-50%, -50%) scaleX(1)';
            if(card.color == 'Coeur' || card.color == 'Carreau'){
                document.querySelector('#card-value').style.color = '#f00';
            } else {
                document.querySelector('#card-value').style.color = '#000';
            }
            document.querySelector('#card-value').innerText = card.value;
            
            if (rulesValue.hasOwnProperty(card.value)) {
                document.querySelector('#rule').innerText = rulesValue[card.value];
            } else {
                document.querySelector('#rule').innerText = rulesColor[card.color];
            }
        });
    });
    
}

function deactivateCard(){
    cardState = 'inactive';
    cardElement.style.transition = 'ease 0.1s';
    cardElement.style.transform = 'translate(-50%, -150%) rotate(0deg) scaleX(0)';
    document.querySelector('#card-value').style.transform = 'translate(-50%, -50%) scaleX(0)';
    document.querySelector('#rule').innerText = 'Pioche une carte';
    wait(200).then(() => {
        document.querySelector('#active-card img').src = 'img/verso.png';
        document.querySelector('#card-value').innerText = '';
        cardElement.style.transition = 'ease 0.1s';
        cardElement.style.transform = 'translate(-50%, -150%) rotate(0deg) scaleX(1)';
    });
}

function drawCard(){
    var card = {
        color: colors[Math.floor(Math.random() * colors.length)],
        value: Math.floor(Math.random() * 13) + 1
    };
    if(card.value > 10){
        switch(card.value){
            case 11:
                card.value = 'V';
                break;
            case 12:
                card.value = 'D';
                break;
            case 13:
                card.value = 'R';
                break;
        }
    }
    drawedCards.push(card);
    return card;
}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}