/*ENVIRONMENTS*/
//DEV
export const HOST = 'http://localhost:3000'

//PRO
//export const HOST=''

export const DATEPICKER_FORMAT = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

export class URLParams {
    public static songId = "songId"
}

export class CRUDFormFields {
    public static songTitle = "songTitle"
    public static songArtist = "songArtist"
    public static songGenres = "songGenres"
    public static songCompanies = "songCompanies"
    public static songRating = "songRating"
    public static songDuration = "songDuration"
    public static songRelease = "songRelease"
}

export class Navigation {
    public static BASE ="/"
    public static EDIT = "edit"
}