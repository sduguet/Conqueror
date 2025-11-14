const body = document.querySelector('body');
let marcketClock = 0;
const marketLabels = ['-55s', '-50s', '-45s', '-40s', '-35s', '-30s', '-20s', '-15s', '-10s', '-5s', '0'];
const marketDatasets = [.6, .7, .8, 1.2, 1.3, 1, .3, .8, .7, 1.1, .9];
const woodPriceNode = document.querySelector('.market__price');
const woodExpectedPriceNode = document.querySelector('.market__sell--expectedPrice');
let woodPrice = marketDatasets[marketDatasets.length - 1];
const btnSell = document.querySelector('.market__sell');
const forest = document.querySelector('.forest');

const multiplicator = document.querySelector('.multiplicator');

const nbShipBNode = document.querySelector('.head .ship__nb--b');
const nbShipWNode = document.querySelector('.head .ship__nb--w');

const nbBishopFiredNode = document.querySelector('.head .nbBishopFired');
const nbBishopFiredWidthNode = document.querySelector('.head .colonized--b');
const nbWarriorFiredNode = document.querySelector('.head .nbWarriorFired');
const nbWarriorFiredWidthNode = document.querySelector('.head .colonized--w');

const nbCurrentScienceNode = document.querySelector('.science-info__graph--current');

const sondeCdNode = document.querySelector('.sonde__cd');
const btnFireSonde = document.querySelector('.fire__sonde');
const shipCdNode = document.querySelector('.ship__cd');
const btnFireShip = document.querySelector('.fire__ship');


const sidebar = document.querySelector('.sidebar');
const sidebarLinks = sidebar.querySelectorAll('.sidebar-list__ele');
let bgCount = 0;

const interact = document.querySelector('.interact');
const conseilLinks = document.querySelectorAll('.interact-head__menu');

const dockInput = document.querySelector('.switch__input');

let cdLs = 5;

let Data = {
    'progress': {
        type: 'progress',
        level: 0,
    },
    'global': {
        cdFireSonde: 0,
        nbSondeFired: 0,
        cdFireShip: 0,
        nbShipWFired: 0,
        nbShipBFired: 0,
        nbWarriorFired: 0,
        nbBishopFired: 0,
        nbWarriorColons: 0,
        nbBishopColons: 0,
    },
    'money': {
        type: 'ressource',
        nb: 0,
        max: Infinity,
        defaultMax: Infinity,
    },
    'wood': {
        type: 'ressource',
        nb: 0,
        max: 100,
        defaultMax: 100,
    },
    'grange': {
        type: 'stockage',
        nb: 0,
        space: 100,
        price: [
            { ressource: 'wood', value: 100 },
            { ressource: 'money', value: 90 }
        ],
        ressource: 'wood',
        upgrade: {
            stat: 'space',
            value: 20,
            price: 10,
            level: 0,
            max: Infinity
        }
    },
    'bucheron': {
        type: 'farm',
        nb: 0,
        price: [
            { ressource: 'money', value: 180 }
        ],
        prod: .5,
        craft: 0,
        ressource: 'wood',
        upgrade: {
            stat: 'prod',
            value: 0.15,
            price: 10,
            level: 0,
            max: Infinity
        }
    },
    'iron': {
        type: 'ressource',
        nb: 0,
        max: 50,
        defaultMax: 50,
    },
    'chambre': {
        type: 'stockage',
        nb: 0,
        price: [
            { ressource: 'wood', value: 330 },
            { ressource: 'money', value: 470 },
            { ressource: 'iron', value: 50 }
        ],
        space: 50,
        ressource: 'iron',
        upgrade: {
            stat: 'space',
            value: 10,
            price: 10,
            level: 0,
            max: Infinity
        }
    },
    'mine': {
        type: 'farm',
        nb: 0,
        price: [
            { ressource: 'wood', value: 220 },
            { ressource: 'money', value: 990 }
        ],
        prod: .25,
        craft: 0,
        ressource: 'iron',
        upgrade: {
            stat: 'prod',
            value: .1,
            price: 10,
            level: 0,
            max: Infinity
        }
    },
    'sonde': {
        type: 'ressource',
        nb: 0,
        max: 10,
        defaultMax: 10,
        price: [
            { ressource: 'iron', value: 30 }
        ],
        probaMin: .5,
        time: 60,
        upgrade: {
            stat: 'time',
            value: -4,
            price: 10,
            level: 0,
            max: 13
        },
        upgrade2: {
            stat: 'probaMin',
            value: 0.1,
            price: 10,
            level: 0,
            max: 5
        }
    },
    'entrepot': {
        type: 'stockage',
        nb: 0,
        price: [
            { ressource: 'wood', value: 1000 },
            { ressource: 'money', value: 2250 },
            { ressource: 'iron', value: 100 },
        ],
        space: 5,
        ressource: 'sonde',
        upgrade: {
            stat: 'space',
            value: 1,
            price: 10,
            level: 0,
            max: Infinity
        },
    },
    'labo': {
        type: 'farm',
        nb: 0,
        price: [
            { ressource: 'money', value: 3200 },
            { ressource: 'iron', value: 330 },
        ],
        prod: .2,
        craft: 0,
        ressource: 'sonde',
        upgrade: {
            stat: 'prod',
            value: 0.05,
            price: 10,
            level: 0,
            max: Infinity
        },
    },
    'planetDiscover': {
        type: 'ressource',
        nb: 0,
        max: Infinity,
        defaultMax: Infinity
    },
    'bishop': {
        type: 'ressource',
        nb: 0,
        max: Infinity,
        defaultMax: Infinity,
        gain: {
            ressource: 'money',
            value: 10
        }
    },
    'eglise': {
        type: 'farm',
        nb: 0,
        price: [
            { ressource: 'wood', value: 3000 },
            { ressource: 'money', value: 6400 },
            { ressource: 'iron', value: 290 },
        ],
        prod: 0.2,
        craft: 0,
        ressource: 'bishop',
        upgrade: {
            stat: 'prod',
            value: 0.1,
            price: 10,
            level: 0,
            max: Infinity
        },
    },
    'warrior': {
        type: 'ressource',
        nb: 0,
        max: Infinity,
        defaultMax: Infinity,
        gain: {
            ressource: 'iron',
            value: 0.1
        }
    },
    'caserne': {
        type: 'farm',
        nb: 0,
        price: [
            { ressource: 'wood', value: 3000 },
            { ressource: 'money', value: 4200 },
            { ressource: 'iron', value: 430 },
        ],
        prod: .2,
        craft: 0,
        ressource: 'warrior',
        upgrade: {
            stat: 'prod',
            value: 0.1,
            price: 10,
            level: 0,
            max: Infinity
        },
    },
    'shipB': {
        type: 'ressource',
        nb: 0,
        max: 10,
        defaultMax: 10,
        capacity: 10,
        get price() {
            return [
                { ressource: 'iron', value: 120 },
                { ressource: 'bishop', value: this.capacity + (this.upgrade2.value * this.upgrade2.level) }
            ];
        },
        time: 90,
        upgrade: {
            stat: 'time',
            value: -4,
            price: 10,
            level: 0,
            max: 20
        },
        upgrade2: {
            stat: 'capacity',
            value: 1,
            price: 10,
            level: 0,
            max: Infinity
        }
    },
    'shipW': {
        type: 'ressource',
        nb: 0,
        max: 10,
        defaultMax: 10,
        capacity: 10,
        get price() {
            return [
                { ressource: 'iron', value: 120 },
                { ressource: 'warrior', value: this.capacity + (this.upgrade2.value * this.upgrade2.level) }
            ];
        },
        time: 90,
        upgrade: {
            stat: 'time',
            value: -4,
            price: 10,
            level: 0,
            max: 20
        },
        upgrade2: {
            stat: 'capacity',
            value: 1,
            price: 10,
            level: 0,
            max: Infinity
        }
    },
    'dock': {
        type: 'farm',
        nb: 0,
        price: [
            { ressource: 'wood', value: 10500 },
            { ressource: 'money', value: 24300 },
            { ressource: 'iron', value: 1200 },
        ],
        prod: .1,
        craft: 0,
        ressource: 'shipB',
        upgrade: {
            stat: 'prod',
            value: 0.05,
            price: 10,
            level: 0,
            max: Infinity
        },
    },
    'hangar': {
        type: 'stockage',
        nb: 0,
        price: [
            { ressource: 'wood', value: 7550 },
            { ressource: 'money', value: 11000 },
            { ressource: 'iron', value: 2100 },
        ],
        space: 5,
        ressource: 'shipB',
        ressource2: 'shipW',
        upgrade: {
            stat: 'space',
            value: 1,
            price: 10,
            level: 0,
            max: Infinity
        },
    },
    'planetColonised': {
        type: 'ressource',
        nb: 0,
        max: Infinity,
        defaultMax: Infinity,
        nbToBeColonized: 200
    },
    'science': {
        type: 'ressource',
        nb: 0,
        max: 10,
        defaultMax: 10,
    },
    'conseil': {
        type: 'farm',
        nb: 0,
        prod: 0.005,
        craft: 0,
        ressource: 'science',
        price: [],
        upgrade: {
            stat: 'prod',
            value: 0,
            price: 0,
            level: 0,
            max: Infinity
        },
    },
    'energy': {
        type: 'ressource',
        nb: 0,
        max: 0,
        defaultMax: 0,
    },
    'extractor': {
        type: 'farm',
        nb: 0,
        prod: 0.2,
        craft: 0,
        ressource: 'energy',
        price: [
            { ressource: 'wood', value: 500000 },
            { ressource: 'money', value: 2000000 },
            { ressource: 'iron', value: 100000 },
        ],
        upgrade: {
            stat: 'energy',
            value: 0,
            price: 0,
            level: 0,
            max: 0
        },
    },
    'faille': {
        type: 'ressource',
        nb: 0,
        max: 100,
        defaultMax: 100,
        price: [
            { ressource: 'energy', value: 1000000 },
        ],
    },
}
const btnTest = nbCurrentScienceNode.dataset.a + interact.dataset.b;

Setup();
function Setup() {
    if (localStorage.getItem('ConquerorData')) CheckVersion();
    else dislpayReadme();

    MajNumbers();
    MajBtns();

    // Events
    window.addEventListener('click', Click);
    window.addEventListener('keypress', KeyboardEvent);
    btnSell.addEventListener('click', Sell);
    const objectWithBtns = Object.entries(Data).filter(([key, value]) => 'price' in value);
    objectWithBtns.forEach(object => {
        document.querySelector(`.card--${object[0]} .card__purchase`).addEventListener('click', () => Purchase(object[0]));
        if (document.querySelector(`.upgrade__card--${object[0]} .upgrade__card__purchase`)) {
            document.querySelector(`.upgrade__card--${object[0]} .upgrade__card__purchase`).addEventListener('click', () => Upgrade(object[0]));

            if (document.querySelector(`.upgrade__card--${object[0]} .upgrade__card__purchase--2`)) {
                document.querySelector(`.upgrade__card--${object[0]} .upgrade__card__purchase--2`).addEventListener('click', () => Upgrade(object[0], 2));
            }
        }
    })
    btnFireSonde.addEventListener('click', FireSonde);
    btnFireShip.addEventListener('click', FireShip);
    sidebarLinks.forEach(links => links.addEventListener('click', ChangeMenu));
    dockInput.addEventListener('change', SwitchDock);
    conseilLinks.forEach(links => links.addEventListener('click', ChangeMenuConseil));

    Update();
    setInterval(Update, 1000);
}

function Update() {
    FarmsUpdate();

    MajNumbers();
    MajBtns();

    LevelResolve();

    if (marcketClock >= 5) ChangewoodPrice();

    if (Data['global'].cdFireSonde === 0) SondeArrive();
    if (Data['global'].cdFireShip === 0) ShipArrive();

    if (cdLs === 0) SaveInLocalStorage();

    marcketClock += 1;
    Data['global'].cdFireSonde -= 1;
    Data['global'].cdFireShip -= 1;
    cdLs -= 1;
}

function Click(e) {
    if (
        e.target.closest('.readme') ||
        e.target.closest('.btn, .sidebar-list__ele') ||
        e.target.closest('.card__price--row') ||
        e.target.closest('.interact-head__menu') ||
        e.target.closest('.switch')
    ) return;

    if (Data['wood'].nb < Data['wood'].max) {
        Data['wood'].nb += 1 + Data['progress'].level;

        PlusOneLogEffect();

        MajNumbers();
        MajBtns()
    }
}

function KeyboardEvent(e) {
    if (e.key === 's' || e.key === 'S') Sell();
    if (e.key === 'c' || e.key === 'C') FireSonde();
    if (e.key === 'v' || e.key === 'V') FireShip();
    if (e.key === '&' || e.key === '1') ChangeMenu('ressources');
    if (e.key === 'é' || e.key === '2') ChangeMenu('exploration');
    if (e.key === '"' || e.key === '3') ChangeMenu('colonisation');
    if (e.key === "'" || e.key === '4') ChangeMenu('conseil');
    if (e.key === "(" || e.key === '5') ChangeMenu('quantique');
    if (e.key === "p" || e.key === 'P') multiplicator.classList.toggle('hide');
}

function ChangewoodPrice() {
    const minPrice = 0.2;
    const maxPrice = 2;

    let variation = Math.floor(Math.random() * 60) / 100;
    if (Math.random() > .5 || woodPrice === 2) variation *= -1;
    if (woodPrice === .2) variation = Math.abs(variation);

    let newPrice = woodPrice + variation;
    newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));
    newPrice = Math.round(newPrice * 100) / 100;

    marketDatasets.shift();
    marketDatasets.push(newPrice),
        woodPrice = newPrice;

    MajNumbers();
    MajBtns()

    const red = [255, 0, 0];
    const white = [255, 255, 255];
    const green = [0, 255, 0];
    let color;
    if (woodPrice <= 0.9) {
        const factor = (woodPrice - 0.2) / (0.9 - 0.2);
        color = interpolateColor(red, white, factor);
    } else {
        const factor = (woodPrice - 0.9) / (2 - 0.9);
        color = interpolateColor(white, green, factor);
    }

    woodPriceNode.style.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    document.querySelector('.market__head').style.borderLeft = `3px solid rgb(${color[0]}, ${color[1]}, ${color[2]})`;

    myChart.data.datasets[0].data = marketDatasets;
    myChart.data.labels = marketLabels;
    myChart.update();

    marcketClock = 0;
}

function interpolateColor(color1, color2, factor) {
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

function Sell() {
    if (Data['wood'].nb === 0) return;

    Data['money'].nb += Data['wood'].nb * woodPrice;
    Data['money'].nb = Math.round(Data['money'].nb * 100) / 100;
    Data['wood'].nb = 0;

    MajNumbers();
    MajBtns()
}

function Purchase(key) {
    if (document.querySelector(`.card--${key} .card__purchase`).classList.contains('disabled')) return;

    const mult = multiplicator.querySelector('.field__input:checked').value;
    const currentItem = Data[key];

    let nbMaxToBuy = Infinity;
    currentItem.price.forEach(p => {
        nbMaxToBuy = Math.min(nbMaxToBuy, Math.floor(Data[p.ressource].nb / p.value))
    });
    nbMaxToBuy = Math.min(nbMaxToBuy, mult);

    currentItem.nb += nbMaxToBuy;
    currentItem.price.forEach(p => {
        Data[p.ressource].nb -= (p.value * nbMaxToBuy);
        Data[p.ressource].nb = Math.round(Data[p.ressource].nb * 100) / 100;
    });

    if (key === 'faille') {
        document.querySelector('.end').classList.remove('hide');
        document.querySelector('.end__start').click();
    }
}

function Upgrade(key, seconde) {
    const currentItem = Data[key];

    if (seconde === 2) {
        if (document.querySelector(`.upgrade__card--${key} .upgrade__card__purchase--2`).classList.contains('disabled')) return;

        const canBuy = currentItem.upgrade2.price <= Data['science'].nb && currentItem.upgrade2.level < currentItem.upgrade2.max;
        if (canBuy) {
            currentItem.upgrade2.level += 1;
            if (key === 'shipB') Data['shipW'].upgrade2.level += 1;
            Data['science'].nb -= currentItem.upgrade2.price;

            MajNumbers();
            MajBtns();
        }
    } else {
        if (document.querySelector(`.upgrade__card--${key} .upgrade__card__purchase`).classList.contains('disabled')) return;

        const canBuy = currentItem.upgrade.price <= Data['science'].nb && currentItem.upgrade.level < currentItem.upgrade.max;
        if (canBuy) {
            currentItem.upgrade.level += 1;
            if (key === 'shipB') Data['shipW'].upgrade.level += 1;
            Data['science'].nb -= currentItem.upgrade.price;

            MajNumbers();
            MajBtns();
        }
    }
}

function FarmsUpdate() {
    const farms = Object.entries(Data).filter(([key, value]) => value.type === 'farm' && value.nb > 0);

    farms.forEach(([farmKey, farmValue]) => {
        const ressource = Data[farmValue.ressource];
        let canBuy = true;

        if (ressource.price) {
            ressource.price.forEach(item => {
                if (Data[item.ressource].nb < item.value) canBuy = false;
            })
        }

        if (ressource.nb < ressource.max && canBuy) {
            const farmProd = Math.floor((farmValue.prod + (farmValue.upgrade.value * farmValue.upgrade.level)) * 1000) / 1000;

            farmValue.craft = Math.round((farmValue.craft + farmValue.nb * farmProd) * 1000) / 1000;

            const rounded = Math.floor(farmValue.craft);
            farmValue.craft = Math.floor((farmValue.craft - rounded) * 1000) / 1000;
            Data[farmValue.ressource].nb = Math.min(Data[farmValue.ressource].nb + rounded, Data[farmValue.ressource].max);

            if (ressource.price) {
                ressource.price.forEach(item => Data[item.ressource].nb -= (rounded * item.value));
            }
        }
    })
}

function MajNumbers() {
    woodPriceNode.innerHTML = `${woodPrice}$`;
    woodExpectedPriceNode.innerHTML = DisplayValue(Math.floor(Data['wood'].nb * woodPrice * 100) / 100);

    for (const [key, value] of Object.entries(Data)) {
        const card = document.querySelector(`.card--${key}`);

        switch (value.type) {
            case 'ressource':
                const storage = Object.values(Data).find(item => item.type === 'stockage' && (item.ressource === key || item.ressource2 === key));
                if (storage) value.max = value.defaultMax + (storage.nb * storage.space + Math.floor((storage.upgrade.level * storage.upgrade.value) * storage.nb * 100) / 100);
                else if (key === 'energy') value.max = value.defaultMax + (Data['planetColonised'].nb * 10);

                document.querySelector(`.${key}__nb`).innerHTML = DisplayValue(Math.floor(value.nb));
                if (document.querySelector(`.${key}__max`)) document.querySelector(`.${key}__max`).innerHTML = DisplayValue(value.max);

                if (value.price) {
                    let priceTxtRessource = '';
                    value.price.forEach(p => priceTxtRessource += `<span class="card__price--row">${key === 'faille' ? DisplayValue(p.value) : p.value} <img src="./assets/img/${p.ressource}.png" /></span>`);
                    card.querySelector('.card__price').innerHTML = priceTxtRessource;
                }
                if (key === 'shipB') {
                    document.querySelector(`.${key}__total`).innerHTML = DisplayValue(Data['shipB'].nb + Data['shipW'].nb);
                    document.querySelector('.card--ship .card__duree').innerHTML = Data['shipB'].time + (Data['shipB'].upgrade.value * Data['shipB'].upgrade.level);
                    document.querySelector('.card--ship .card__capacite').innerHTML = Data['shipB'].capacity + (Data['shipB'].upgrade2.value * Data['shipB'].upgrade2.level);
                    document.querySelector('.card__gainB').innerHTML = `+${Data['bishop'].gain.value}<img src="./assets/img/money.png" />/<img src="./assets/img/bishop.png" />`;
                    document.querySelector('.card__gainW').innerHTML = `+${Data['warrior'].gain.value}<img src="./assets/img/iron.png" />/<img src="./assets/img/warrior.png" />`;
                } else if (key === 'sonde') {
                    document.querySelector('.card--sonde .card__proba').innerHTML = Math.floor((Data['sonde'].probaMin + (Data['sonde'].upgrade2.value * Data['sonde'].upgrade2.level)) * 10 * 100) / 100;
                    document.querySelector('.card--sonde .card__duree').innerHTML = Data['sonde'].time + (Data['sonde'].upgrade.value * Data['sonde'].upgrade.level);
                } else if (key === 'planetColonised') {
                    document.querySelector('.planetColonised__colons').innerHTML = Data['planetColonised'].nbToBeColonized;
                    nbBishopFiredNode.innerHTML = Data['global'].nbBishopColons;
                    nbWarriorFiredNode.innerHTML = Data['global'].nbWarriorColons;
                } else if (key === 'science') {
                    document.querySelector('.science__prod').innerHTML = Data['conseil'].prod;
                }
                break;

            case 'stockage':
                let priceTxtStockage = '';
                value.price.forEach(p => priceTxtStockage += `<span class="card__price--row">${p.value} <img src="./assets/img/${p.ressource}.png" /></span>`);

                card.querySelector('.card__nb').innerHTML = DisplayValue(value.nb);
                card.querySelector('.card__price').innerHTML = priceTxtStockage;
                card.querySelector('.card__space').innerHTML = `+${DisplayValue(Math.floor((value.space + (value.upgrade.level * value.upgrade.value)) * 100) / 100)}<img src="./assets/img/${value.ressource}.png" />max`;
                break;

            case 'farm':
                let priceTxtFarm = '';
                value.price.forEach(p => priceTxtFarm += `<span class="card__price--row">${key === 'extractor' ? DisplayValue(p.value) : p.value} <img src="./assets/img/${p.ressource}.png" /></span>`);
                const farmProd = Math.floor((value.prod + (value.upgrade.value * value.upgrade.level)) * 100) / 100;

                card.querySelector('.card__nb').innerHTML = DisplayValue(value.nb);
                card.querySelector('.card__prod1').innerHTML = `${DisplayValue(farmProd)}<img src="./assets/img/${value.ressource}.png" /> /sec`;
                card.querySelector('.card__prod').innerHTML = `${DisplayValue(Math.floor(value.nb * farmProd * 100) / 100)}<img src="./assets/img/${value.ressource}.png" />/sec`;
                card.querySelector('.card__price').innerHTML = priceTxtFarm;
                break;

            default:
                break;
        }

        if (value.upgrade && key !== 'conseil') {
            const upgradeCard = document.querySelector(`.upgrade__card--${key}`);
            if (upgradeCard) {
                upgradeCard.querySelector('.upgrade__card__data').innerHTML = `${value.upgrade.value > 0 ? '+' : ''}${value.upgrade.value}`;
                upgradeCard.querySelector('.upgrade__card__old').innerHTML = value[value.upgrade.stat] + (value.upgrade.level * value.upgrade.value);
                upgradeCard.querySelector('.upgrade__card__new').innerHTML = Math.floor((value[value.upgrade.stat] + (value.upgrade.level * value.upgrade.value) + value.upgrade.value) * 100) / 100;
                upgradeCard.querySelector('.upgrade__card__price').innerHTML = value.upgrade.price;
                
                if (value.upgrade2) {
                    if (key === 'sonde') {
                        upgradeCard.querySelector('.upgrade__card__data--2').innerHTML = `${value.upgrade2.value > 0 ? '+' : ''}${value.upgrade2.value * 100}`;
                        upgradeCard.querySelector('.upgrade__card__old--2').innerHTML = value[value.upgrade2.stat] + (value.upgrade2.level * value.upgrade2.value) * 10;
                        upgradeCard.querySelector('.upgrade__card__new--2').innerHTML = Math.floor((value[value.upgrade2.stat] + (value.upgrade2.level * value.upgrade2.value) + value.upgrade2.value) * 1000) / 100;
                        upgradeCard.querySelector('.upgrade__card__price--2').innerHTML = value.upgrade2.price;
                    } else if (key === 'shipB') {
                        upgradeCard.querySelector('.upgrade__card__data--2').innerHTML = `${value.upgrade2.value > 0 ? '+' : ''}${value.upgrade2.value}`;
                        upgradeCard.querySelector('.upgrade__card__old--2').innerHTML = value[value.upgrade2.stat] + (value.upgrade2.level * value.upgrade2.value);
                        upgradeCard.querySelector('.upgrade__card__new--2').innerHTML = Math.floor((value[value.upgrade2.stat] + (value.upgrade2.level * value.upgrade2.value) + value.upgrade2.value) * 100) / 100;
                        upgradeCard.querySelector('.upgrade__card__price--2').innerHTML = value.upgrade2.price;
                    }
                }
            }
        }
    }

    const maxShip = Data['shipB'].max;
    const totalShip = Data['shipB'].nb + Data['shipW'].nb;
    const totalWidth = Math.min(Math.floor(totalShip * 100 / maxShip), 100);
    const shipBWidth = Data['shipB'].nb + Data['shipW'].nb === 0
        ? 0
        : Math.floor(Math.floor(Data['shipB'].nb / (Data['shipB'].nb + Data['shipW'].nb) * totalWidth));
    const shipWWidth = totalWidth - shipBWidth;

    nbShipBNode.style.width = `${shipBWidth}px`;
    nbShipWNode.style.width = `${shipWWidth}px`;
    
    const maxColons = DisplayValue(Data['planetColonised'].nbToBeColonized);
    const totalColons = Data['global'].nbBishopColons + Data['global'].nbWarriorColons;
    const totalColonsWidth = Math.min(Math.floor(totalColons * 200 / maxColons), 200);
    const bishopWidth = Data['global'].nbBishopColons + Data['global'].nbWarriorColons === 0
        ? 0
        : Math.floor(Math.floor(Data['global'].nbBishopColons / (Data['global'].nbBishopColons + Data['global'].nbWarriorColons) * totalColonsWidth));
    const warriorWidth = totalColonsWidth - bishopWidth;

    nbBishopFiredWidthNode.style.width = `${bishopWidth}px`;
    nbWarriorFiredWidthNode.style.width = `${warriorWidth}px`;

    nbCurrentScienceNode.style.width = `${Data['conseil'].craft * 100}px`;
}

function MajBtns() {
    const objectWithBtns = Object.entries(Data).filter(([key, value]) =>
        Object.prototype.hasOwnProperty.call(value, 'price') || 'price' in value
    );
    objectWithBtns.forEach(([objectKey, objectValue]) => {
        const card = document.querySelector(`.card--${objectKey}`);
        const btnPurchase = card.querySelector('.card__purchase');
        const btnUpgrade = document.querySelector(`.upgrade__card--${objectKey} .upgrade__card__purchase`);
        btnPurchase.classList.remove('disabled');

        if (btnUpgrade) {
            btnUpgrade.classList.remove('disabled');

            if (objectValue.upgrade.price > Data['science'].nb || objectValue.upgrade.level >= objectValue.upgrade.max) {
                btnUpgrade.classList.add('disabled');
            }

            if (objectValue.upgrade2) {
                const btnUpgrade2 = document.querySelector(`.upgrade__card--${objectKey} .upgrade__card__purchase--2`);
                btnUpgrade2.classList.remove('disabled');

                if (objectValue.upgrade2.price > Data['science'].nb || objectValue.upgrade2.level >= objectValue.upgrade2.max) {
                    btnUpgrade2.classList.add('disabled');
                }
            }
        }

        objectValue.price.forEach(p => {
            if (Data[p.ressource].nb < p.value) btnPurchase.classList.add('disabled');
        });

        if (
            objectValue.type === 'ressource' &&
            objectValue.nb >= objectValue.max
        ) btnPurchase.classList.add('disabled');

        if (objectKey === 'shipW' || objectKey === 'shipB') {
            if (Data['shipW'].nb + Data['shipB'].nb >= objectValue.max) {
                btnPurchase.classList.add('disabled');
            }
        }
    })

    btnSell.classList.toggle('disabled', Data['wood'].nb < 1);
    btnFireSonde.classList.toggle('disabled', Data['sonde'].nb < 1 || Data['global'].cdFireSonde > 0);
    btnFireShip.classList.toggle('disabled', (Data['shipB'].nb < 1 && Data['shipW'].nb < 1) || Data['global'].cdFireShip > 0 || Data['planetDiscover'].nb <= 0);
    sondeCdNode.innerHTML = Data['global'].cdFireSonde <= 0
        ? ''
        : `${Data['global'].cdFireSonde}s`;
    shipCdNode.innerHTML = Data['global'].cdFireShip <= 0
        ? ''
        : `${Data['global'].cdFireShip}s`;
}


const ctxChart = document.getElementById('myChart');
myChart = new Chart(ctxChart, {
    type: 'line',
    data: {
        labels: marketLabels,
        datasets: [{
            label: 'Cours du bois',
            data: marketDatasets,
            fill: false,
            borderColor: '#B48355',
            tension: 0.33,
            pointRadius: 0,
            pointHoverRadius: 0,
        }],
    },
    options: {
        scales: {
            y: {
                min: 0.2,
                max: 2
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

function FireSonde() {
    if (btnFireSonde.classList.contains('disabled')) return;

    Data['global'].nbSondeFired = Data['sonde'].nb
    Data['sonde'].nb = 0;
    Data['global'].cdFireSonde = Data['sonde'].time + (Data['sonde'].upgrade.value * Data['sonde'].upgrade.level);

    startProbesAnimation();
    MajNumbers();
    MajBtns();
}

function SondeArrive() {
    Data['planetDiscover'].nb += getRandomArbitrary(Math.floor(Data['global'].nbSondeFired * (Data['sonde'].probaMin + (Data['sonde'].upgrade2.value * Data['sonde'].upgrade2.level))), Data['global'].nbSondeFired);
    Data['global'].nbSondeFired = 0;
}

function FireShip() {
    if (btnFireShip.classList.contains('disabled')) return;

    Data['global'].nbShipBFired = Data['shipB'].nb;
    Data['global'].nbShipWFired = Data['shipW'].nb;
    Data['global'].nbWarriorFired = Data['shipW'].nb * ((Data['shipB'].upgrade2.value * Data['shipB'].upgrade2.level) + Data['shipW'].capacity);
    Data['global'].nbBishopFired = Data['shipB'].nb * ((Data['shipB'].upgrade2.value * Data['shipB'].upgrade2.level) + Data['shipB'].capacity);

    Data['shipB'].nb = 0;
    Data['shipW'].nb = 0;
    Data['global'].cdFireShip = Data['shipB'].time + (Data['shipB'].upgrade.value * Data['shipB'].upgrade.level);

    startShipsAnimation();
    MajNumbers();
    MajBtns();
}

function ShipArrive() {
    Data['global'].nbBishopColons += Data['global'].nbBishopFired;
    Data['global'].nbWarriorColons += Data['global'].nbWarriorFired;

    Data['global'].nbWarriorFired = 0;
    Data['global'].nbBishopFired = 0;
    Data['global'].nbShipBFired = 0;
    Data['global'].nbShipWFired = 0;

    ResolveColonization();
}

function ResolveColonization() {
    const nbToBeColonized = Data['planetColonised'].nbToBeColonized;
    const totalColons = Data['global'].nbBishopColons + Data['global'].nbWarriorColons;

    if (totalColons >= nbToBeColonized) {
        if (Data['global'].nbBishopColons >= nbToBeColonized) {
            const nbPlenetToColonised = Math.floor(Data['global'].nbBishopColons / nbToBeColonized);
            Data['money'].nb += ((nbToBeColonized * nbPlenetToColonised) * Data['bishop'].gain.value)
            Data['global'].nbBishopColons -= (nbToBeColonized * nbPlenetToColonised);
            CapturePlanet(nbPlenetToColonised);
        } else if (Data['global'].nbWarriorColons >= nbToBeColonized) {
            const nbPlenetToColonised = Math.floor(Data['global'].nbWarriorColons / nbToBeColonized);
            Data['mine'].craft += Math.floor((nbToBeColonized * nbPlenetToColonised) * Data['warrior'].gain.value * 1000) / 1000;
            Data['global'].nbWarriorColons -= (nbToBeColonized * nbPlenetToColonised);
            CapturePlanet(nbPlenetToColonised);
        } else {
            const remainingColons = Math.max(nbToBeColonized - Data['global'].nbBishopColons, 0);
            Data['global'].nbBishopColons = 0;
            Data['global'].nbWarriorColons -= remainingColons;
            Data['money'].nb += ((nbToBeColonized - remainingColons) * Data['bishop'].gain.value)
            Data['mine'].craft += Math.floor(remainingColons * Data['warrior'].gain.value * 1000) / 1000;
            CapturePlanet(1);
        }
    }
}

function CapturePlanet(nb) {
    if (Data['planetDiscover'].nb >= nb) {
        Data['planetDiscover'].nb -= nb;
        Data['planetColonised'].nb += nb;
    } else {
        Data['planetColonised'].nb += Data['planetDiscover'].nb;
        Data['planetDiscover'].nb = 0;
    }

    ResolveColonization();
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function PlusOneLogEffect() {
    const x = event.clientX;
    const y = event.clientY;

    const woodEffect = document.createElement('div');
    woodEffect.classList.add('woodEffect');

    const plusOne = document.createElement('span');
    plusOne.textContent = `+${1 + Data['progress'].level}`;
    woodEffect.appendChild(plusOne);

    const logImage = document.createElement('img');
    logImage.src = './assets/img/wood.png';
    logImage.style.width = '33px';
    logImage.style.height = '20px';
    woodEffect.appendChild(logImage);

    woodEffect.style.left = `${x - 15}px`;
    woodEffect.style.top = `${y - 15}px`;

    document.querySelector('body').appendChild(woodEffect);

    setTimeout(() => {
        woodEffect.remove();
    }, 2000);
}

function ChangeMenu(menuName) {
    const link = typeof menuName === 'string'
        ? document.querySelector(`[data-target='${menuName}']`)
        : this;

    const oldActive = document.querySelector('.sidebar-list__ele--active');
    if (
        oldActive === link ||
        parseInt(link.dataset.level) > Data['progress'].level
    ) return;
    
    oldActive.classList.remove('sidebar-list__ele--active');
    link.classList.add('sidebar-list__ele--active');

    document.querySelector(`.bg__${oldActive.dataset.target}`).classList.add('hide');
    document.querySelector(`.bg__${link.dataset.target}`).classList.remove('hide');

    document.querySelector(`.interact-list--${oldActive.dataset.target}`).classList.add('hide');
    document.querySelector(`.interact-list--${link.dataset.target}`).classList.remove('hide');

    if (link.dataset.target === 'conseil') {
        document.querySelector('.bg__conseil').dataset.count = bgCount % 4 + 1;

        bgCount += 1;
    }
}

function ChangeMenuConseil() {
    const link = this;

    if (link.classList.contains('interact-head__menu--active')) return;

    const oldLink = document.querySelector('.interact-head__menu--active');
    oldLink.classList.remove('interact-head__menu--active');
    link.classList.add('interact-head__menu--active');
}

function SwitchDock() {
    Data['dock'].ressource = Data['dock'].ressource === 'shipB'
        ? 'shipW'
        : 'shipB';
}

function DisplayValue(value) {
    let str = value;

    switch (true) {
        case value >= 1e9:
            str = Math.floor(value / 1e9);
            str += 'B';
            break;
            
        case value >= 1e6:
            str = Math.floor(value / 1e6);
            str += 'M';
            break;
            
        case value >= 1e3:
            str = Math.floor(value / 1e3);
            str += 'k';
            break;

        default:
            break;
    }

    return str;
}

function tt(value) {
    const suffixes = [
        { value: 1e9, symbol: 'B' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'k' }
    ];

    for (let { value: threshold, symbol } of suffixes) {
        if (value >= threshold) {
            return (value / threshold).toFixed(1).replace(/\.0$/, '') + symbol;
        }
    }

    return value.toString();
}

function LevelResolve() {
    switch (Data['progress'].level) {
        case 0:
            if (Data['wood'].nb >= 56) Data['progress'].level = 1;
            break;

        case 1:
            if (Data['grange'].nb >= 1 && Data['bucheron'].nb >= 4 && Data['wood'].nb >= 20) Data['progress'].level = 2;
            break;

        case 2:
            if (Data['chambre'].nb >= 1 && Data['mine'].nb >= 4 && Data['iron'].nb >= 10) Data['progress'].level = 3;
            break;

        case 3:
            if (Data['planetDiscover'].nb >= 110) Data['progress'].level = 4;
            break;

        case 4:
            if (Data['planetColonised'].nb >= 100) {
                Data['progress'].level = 5;
                Data['conseil'].nb = 1;
            }
            break;

        case 5:
            if (Data['planetColonised'].nb >= 1000) {
                Data['progress'].level = 6;
                Data['conseil'].prod = 0.0055;
            }
            break;

        default:
            if (Data['planetColonised'].nb >= 10000000) {
                Data['conseil'].prod = 0.0075;
            } else if (Data['planetColonised'].nb >= 1000000) {
                Data['conseil'].prod = 0.007;
            } else if (Data['planetColonised'].nb >= 100000) {
                Data['conseil'].prod = 0.0065;
            } else if (Data['planetColonised'].nb >= 10000) {
                Data['conseil'].prod = 0.006;
            }
            break;
    };

    body.dataset.progress = Data['progress'].level;
}

function SaveInLocalStorage() {
    saveEncryptedObject('ConquerorData', Data);
    cdLs = 5;
}

function encryptObject(object) {
    const jsonString = JSON.stringify(object);
    return CryptoJS.AES.encrypt(jsonString, btnTest).toString();
}

function decryptObject(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, btnTest);
    const jsonString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
}

function saveEncryptedObject(key, object) {
    const encryptedData = encryptObject(object);
    localStorage.setItem(key, encryptedData);
}

function getDecryptedObject(key) {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
        return decryptObject(encryptedData);
    }
    return null;
}

function CheckVersion() {
    const ls = getDecryptedObject('ConquerorData');

    for (const [key, value] of Object.entries(ls)) {
        if (key === 'global') {
            for (const [k, v] of Object.entries(value)) {
                Data['global'][k] = v;
            }
        } else {
            if (value.level !== undefined) {
                Data[key].level = value.level;
            }
            if (value.nb !== undefined) {
                Data[key].nb = value.nb;
            }
            if (value.upgrade !== undefined) {
                Data[key].upgrade.level = value.upgrade.level;
            }
            if (value.upgrade2 !== undefined) {
                Data[key].upgrade2.level = value.upgrade2.level;
            }
        }

        if (key === 'dock') {
            Data['dock'].ressource = value.ressource;

            if (Data['dock'].ressource === 'shipW') {
                dockInput.checked = true;
            }
        }
    }
}

function dislpayReadme() {
    const readme = document.querySelector('.readme');
    readme.classList.remove('hide');
    readme.addEventListener('click', closeReadme);
}

function closeReadme(e) {
    if (!e.target.classList.contains('readme')) return;

    const readme = document.querySelector('.readme');
    readme.classList.add('hide');
}