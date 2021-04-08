export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses() {
        return this.getResource('/houses/');
    }
    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }

    getAllBooks() {
        return this.getResource('/books/');
    }
    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }

    addData(data) {
        if (data) {
            return data;
        } else {
            return "no data :((";
        }
    }

    _extractId = (item) => {
        const idReg = /\/([0-9]*)$/;
        return item.url.match(idReg)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.addData(char.name),
            gender: this.addData(char.gender),
            born: this.addData(char.born),
            died: this.addData(char.died),
            culture: this.addData(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            id: this._extractId(house),
            name: this.addData(house.name),
            region: this.addData(house.region),
            words: this.addData(house.words),
            titles: this.addData(house.titles),
            overlord: this.addData(house.overlord),
            ancestralWeapons: this.addData(house.ancestralWeapons)
        }
    }

    _transformBook(book) {
        return {
            id: this._extractId(book),
            name: this.addData(book.name),
            numberOfPages: this.addData(book.numberOfPages),
            publisher: this.addData(book.publisher),
            released: this.addData(book.released)
        }
    }
}
