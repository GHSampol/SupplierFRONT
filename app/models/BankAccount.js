export default class BankAccount {
  constructor() {    
        id: 0;
        bank_country: '';             
        bank_country_code: ''; 
        bank_code: ''; 
        bank_name: ''; 
        swift: ''; 
     principal : false;
        bank_account: ''; 
        control_key : ''; 
        iban : ''; 
        cci : ''; 
        clabe: ''; 
        aba: ''; 
        coin: ''; 
        account_type: '';    
        file_id_egnyte: '';
        bank_group: '';
  }
  getJson(dato = {}) {
    this.bank_country = dato.bank_country ?? ''
    this.bank_country_code = dato.bank_country_code ?? ''
    this.bank_code = dato.bank_code ?? ''
    this.bank_name = dato.bank_name ?? ''
    this.swift = dato.swift ?? ''
    this.bank_account = dato.bank_account ?? ''
    this.control_key = dato.control_key ?? ''
    this.iban = dato.iban ?? ''
    this.cci = dato.cci ?? ''
    this.clabe = dato.clabe ?? ''
    this.aba = dato.aba ?? ''
    this.principal = dato.principal ?? false
    this.coin = dato.coin ?? ''
    this.account_type = dato.account_type ?? ''
    this.file_id_egnyte = dato.file_id_egnyte ?? ''
    this.bank_group = dato.bank_group ?? ''

    return { ...this }
  }
}