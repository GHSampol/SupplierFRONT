export default class Contacts {
  constructor() {    
        id: 0;
        name : '';
        lastname: '';
        email : '';
        type: '';
        phone_number: '';
        prefered_lang: 0;
        principal: false     
  }
  getJson(dato = {}) {

    this.name = dato.name ?? ''
    this.lastname = dato.lastname ?? ''
    this.email = dato.email ?? ''
    this.type = dato.type ?? ''
    this.phone_number = dato.phone_number ?? ''
    this.prefered_lang = dato.prefered_lang ?? 1
    this.principal = dato.principal ?? false

    return { ...this }
  }
}