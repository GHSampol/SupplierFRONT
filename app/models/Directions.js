export default class Directions {
  constructor() {  
        id: 0;  
        name: '';
        principal : false;
        search_concept: '';
        street: '';
        number: '';
        postal_code: '';
        city : '';
        country : '';
        region: '';        
        comments: '';
        principal: false;
        language: 0;
  }
  getJson(dato = {}, principal) {

    this.name = dato.name ?? ''
    this.principal = principal
    this.search_concept = dato.search_concept ?? ''
    this.street = dato.street ?? ''
    this.number = dato.number ?? ''
    this.postal_code = dato.postal_code ?? ''
    this.city = dato.city ?? ''
    this.country = dato.country ?? ''
    this.region = dato.region ?? ''
    this.comments = dato.comments ?? ''
    this.language = dato.language ?? 1

    return { ...this }
  }

}
