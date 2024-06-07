export class Artist {

    id: number
    name: string
    bornCity: string
    birthdate: string
    img: string
    rating: number
    songs: number[]

    constructor(id: number, name: string, bornCity: string, birthdate: string ,img: string, rating: number, songs: number[],artist:number) {
        this.id = id
        this.name = name
        this.bornCity = bornCity
        this.birthdate = birthdate
        this.img = img
        this.rating = rating
        this.songs = songs
    }
}