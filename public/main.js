"use strict";
// 1 expraision complete
// egale monte l'expraision {
// si l'expraision n'a pas de symbole return
// si l'exprision a du symbole monte l'expraision }
// symbole {
// si le OutPut[length - 1] == symbole return
// si non ecris la valeur normale
const OutPutPlace = document.querySelector('.outPut');
const PreviewPlace = document.querySelector('.equation');
const emtyForNow = document.querySelector('.emtyForNow');
const nbrInputs = document.querySelectorAll('.inputs .nbr');
const vergule = document.querySelector('.inputs .vergule');
const clearBtn = document.querySelector('.inputs .clear');
const deleteBtn = document.querySelector('.inputs .delete');
const percnt = document.querySelector('.inputs .percnt');
const devesion = document.querySelector('.inputs .devesion');
const multiplication = document.querySelector('.inputs .multiplication');
const moins = document.querySelector('.inputs .moins');
const plus = document.querySelector('.inputs .plus');
const equals = document.querySelector('.inputs .equals');
class Calculatrise {
    constructor(outPut = '', preview = '= ', sumByInputs = 0, sumByDefault = 0, symbole = '') {
        this.outPut = outPut;
        this.preview = preview;
        this.sumByInputs = sumByInputs;
        this.sumByDefault = sumByDefault;
        this.symbole = symbole;
    }
    nbrClickEvent(thenbr) {
        let change = false;
        if (PreviewPlace.classList.contains('addVergul')) {
            if (thenbr == '0')
                return;
            this.sumByInputs += +thenbr / 10;
            this.outPut += thenbr;
            this.preview += (+thenbr / 10).toString();
            change = true;
            PreviewPlace.classList.remove('addVergul');
        }
        if (PreviewPlace.classList.contains('outInEgale')) {
            let PreviewEgalArrya = this.preview.trim().split('');
            PreviewEgalArrya.shift();
            this.outPut = PreviewEgalArrya.join('');
            PreviewPlace.classList.remove('outInEgale');
            if (this.symbole == 'x') {
                this.sumByDefault = 1;
            }
            else {
                this.sumByDefault = 0;
            }
            if (PreviewEgalArrya[1] == '-') {
                this.sumByInputs = -parseFloat(this.outPut);
            }
            else {
                this.sumByInputs = parseFloat(this.outPut);
            }
            this.preview = '= ';
        }
        if (!change) {
            this.outPut += thenbr;
            this.preview += thenbr;
            this.sumByInputs = parseFloat(this.sumByInputs.toString() + thenbr);
        }
        this.scan();
    }
    vergul() {
        if (PreviewPlace.classList.contains('hasVergule'))
            return;
        this.outPut += '.';
        PreviewPlace.classList.add('addVergul');
        PreviewPlace.classList.add('hasVergule');
        this.scan();
    }
    clear() {
        PreviewPlace.classList.remove('addVergul');
        PreviewPlace.classList.remove('hasVergule');
        PreviewPlace.classList.remove('outInEgale');
        this.symbole = '';
        this.preview = '= ';
        this.outPut = '';
        this.sumByDefault = 0;
        this.sumByInputs = 0;
        this.scan();
    }
    delete() {
        if (this.outPut.length == 0)
            return;
        const theArryForchek = this.outPut.split('');
        const Lastindex = theArryForchek[theArryForchek.length - 1];
        if (Lastindex == '.') {
            theArryForchek.pop();
            this.outPut = theArryForchek.join('');
            this.scan();
            PreviewPlace.classList.remove('hasVergule');
            PreviewPlace.classList.remove('addVergul');
            return;
        }
        if (Lastindex == '+' ||
            Lastindex == '-' ||
            Lastindex == '/' ||
            Lastindex == '*') {
            const ArryOfOutPut = this.outPut.split('');
            ArryOfOutPut.pop();
            this.outPut = ArryOfOutPut.join('');
            const forchange = this.sumByDefault;
            this.sumByDefault = this.sumByInputs;
            this.sumByInputs = forchange;
            this.symbole = '';
        }
        else {
            // Src.txt
            if (this.sumByInputs > 0) {
                const ArryOfOutPut = this.outPut.split('');
                ArryOfOutPut.pop();
                this.outPut = ArryOfOutPut.join('');
                const sumByInptsArr = this.sumByInputs.toString().split('');
                sumByInptsArr.pop();
                let newArr = sumByInptsArr.join('');
                this.sumByInputs = parseFloat(newArr);
                if (!newArr) {
                    this.sumByInputs = 0;
                }
            }
            else {
                const ArryOfOutPut = this.outPut.split('');
                ArryOfOutPut.pop();
                this.outPut = ArryOfOutPut.join('');
                const sumByDefaultArr = this.sumByDefault.toString().split('');
                sumByDefaultArr.pop();
                let newArr = sumByDefaultArr.join('');
                this.sumByDefault = parseFloat(newArr);
                if (!newArr) {
                    this.sumByDefault = 0;
                }
            }
        }
        let NewtheArryForchek = this.outPut.split('');
        let NewLastindex = NewtheArryForchek[NewtheArryForchek.length - 1];
        if (NewLastindex == '.') {
            NewtheArryForchek.pop();
            this.outPut = NewtheArryForchek.join('');
            PreviewPlace.classList.remove('hasVergule');
        }
        this.scan();
    }
    percnt() {
        if (this.outPut == '')
            return;
        const previewArray = this.preview.trim().split('');
        previewArray.shift();
        this.preview = previewArray.join('');
        this.sumByInputs = parseFloat(this.preview) / 100;
        this.load();
        this.scan();
    }
    equals() {
        if (this.outPut == '')
            return;
        this.load();
        this.scan();
    }
    devesion() {
        this.chekSymbole('/');
    }
    multiplication() {
        this.chekSymbole('*');
    }
    moins() {
        this.chekSymbole('-');
    }
    plus() {
        this.chekSymbole('+');
    }
    load() {
        this.outPut = '';
        PreviewPlace.classList.add('outInEgale');
        this.scan();
    }
    scan() {
        if (this.preview !== '= ') {
            if (this.symbole == '' || this.symbole == '+') {
                this.preview = `= ${this.sumByDefault + this.sumByInputs}`;
            }
            else if (this.symbole == '-') {
                this.preview = `= ${this.sumByDefault - this.sumByInputs}`;
            }
            else if (this.symbole == 'x') {
                this.preview = `= ${this.sumByDefault * this.sumByInputs}`;
            }
            else if (this.symbole == '/') {
                this.preview = `= ${this.sumByDefault / this.sumByInputs}`;
            }
            else {
                throw new Error('the Symbole Is not here');
            }
        }
        if (this.preview.length > 12) {
            let theArrychange = this.preview.trim().split('');
            theArrychange.shift();
            theArrychange.length = 12;
            this.preview = theArrychange.join('');
        }
        if (this.preview === '= NaN') {
            window.location.reload();
            return;
        }
        if (this.preview !== '= Infinity') {
            PreviewPlace.textContent = this.preview;
        }
        OutPutPlace.textContent = this.outPut;
    }
    chekSymbole(symboleEntry) {
        if (PreviewPlace.classList.contains('hasVergule')) {
            PreviewPlace.classList.remove('hasVergule');
        }
        if (PreviewPlace.classList.contains('outInEgale')) {
            let PreviewEgalArrya = this.preview.trim().split('');
            PreviewEgalArrya.shift();
            this.outPut = PreviewEgalArrya.join('');
            PreviewPlace.classList.remove('outInEgale');
        }
        const outPutArray = this.outPut.split('');
        const outPutSymbole = outPutArray[outPutArray.length - 1];
        if (isNaN(+outPutSymbole)) {
            if (symboleEntry == '-' && outPutSymbole == '-') {
                this.symbole = '+';
            }
            else if (symboleEntry == '-' && outPutSymbole == '+') {
                this.symbole == '-';
            }
            else {
                return;
            }
        }
        if (!!this.symbole) {
            if (this.symbole == '+') {
                this.outPut = `${this.sumByDefault + this.sumByInputs}`;
            }
            else if (this.symbole == '-') {
                this.outPut = `${this.sumByDefault - this.sumByInputs}`;
            }
            else if (this.symbole == 'x') {
                this.outPut = `${this.sumByDefault * this.sumByInputs}`;
            }
            else if (this.symbole == '/') {
                this.outPut = `${this.sumByDefault / this.sumByInputs}`;
            }
        }
        if (symboleEntry == '*') {
            this.symbole = 'x';
        }
        else {
            this.symbole = symboleEntry;
        }
        const previewArray = this.preview.trim().split('');
        previewArray.shift();
        this.sumByDefault = parseFloat(previewArray.join(''));
        this.sumByInputs = 0;
        this.outPut += this.symbole;
        this.scan();
    }
}
Calculatrise.myCalc = new Calculatrise();
nbrInputs.forEach((nbr) => {
    nbr.addEventListener('click', () => {
        Calculatrise.myCalc.nbrClickEvent(nbr.textContent);
    });
});
clearBtn.addEventListener('click', () => {
    Calculatrise.myCalc.clear();
});
deleteBtn.addEventListener('click', () => {
    Calculatrise.myCalc.delete();
});
percnt.addEventListener('click', () => {
    Calculatrise.myCalc.percnt();
});
plus.addEventListener('click', () => {
    Calculatrise.myCalc.plus();
});
multiplication.addEventListener('click', () => {
    Calculatrise.myCalc.multiplication();
});
moins.addEventListener('click', () => {
    Calculatrise.myCalc.moins();
});
devesion.addEventListener('click', () => {
    Calculatrise.myCalc.devesion();
});
equals.addEventListener('click', () => {
    Calculatrise.myCalc.equals();
});
vergule.addEventListener('click', () => {
    Calculatrise.myCalc.vergul();
});
emtyForNow.addEventListener('click', () => {
    const popUp = document.querySelector('.pop-up');
    popUp.classList.add('pop');
    setTimeout(() => {
        popUp.classList.remove('pop');
    }, 2000);
});
