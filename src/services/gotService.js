export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter)
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

    _transformCharacter(char) {
        return {
            name: this.addData(char.name),
            gender: this.addData(char.gender),
            born: this.addData(char.born),
            died: this.addData(char.died),
            culture: this.addData(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}
