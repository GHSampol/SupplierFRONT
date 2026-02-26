export default class Documents {
  constructor() {    
        type: '';
        file_id_egnyte: '';
        date_expiration: ''     
  }
  getJson(dato = {}) {

    this.type = dato.type ?? ''
    this.file_id_egnyte = dato.file_id_egnyte ?? ''
    this.date_expiration = dato.date_expiration ?? ''

    return { ...this }
  }
}
