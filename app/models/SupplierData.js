export default class SupplierData {
  constructor() {    
      person_type: '';
      name : '';
      lastname : ''; 
      middle_name: '';
      second_lastname: '';
      type_cif: '';
      social_reason: '';
      country: '';
      priv_policy : false;
      cif: '';   
      web_page : '';
      prefered_lang :0;
      sampol_mail_address : '';
      folder_id : '';
      url_certifications: '';
      has_certifications :false;
      invitation_id: '';
      comment: '';
      vendor_type: ''   ;
      treasury_group: '';
      email_company: '';
      phone_company: '';
  }

  getJson(dato = {}, has_cert, code, comment, priv_policy) {

    this.person_type = dato.person_type ?? ''
    this.name = dato.name ?? ''
    this.lastname = dato.lastname ?? ''
    this.middle_name = dato.middle_name ?? ''
    this.second_lastname = dato.second_lastname ?? ''
    this.type_cif = dato.type_cif ?? ''
    this.social_reason = dato.social_reason ?? ''
    this.country = dato.country ?? ''
    this.priv_policy = priv_policy=="true"? true : false
    this.cif = dato.cif ?? ''
    this.web_page = dato.web_page ?? ''
    this.prefered_lang = dato.prefered_lang ?? 1
    this.sampol_mail_address = dato.sampol_mail_address ?? ''
    this.folder_id = dato.folder_id ?? ''
    this.url_certifications = dato.url_certifications ?? ''
    this.has_certifications = has_cert ?? false
    this.invitation_id = code ?? ''
    this.comment = comment ?? ''
    this.vendor_type = dato.vendor_type ?? ''
    this.treasury_group = dato.treasury_group ?? ''
    this.email_company = dato.email_company ?? ''
    this.phone_company = dato.phone_company ?? ''

    return { ...this }
  }
  getJsonReducido(priv_policy, social_reason, cif, code, comment) {

    this.person_type =  ''
    this.name =  ''
    this.lastname = ''
    this.middle_name = ''
    this.second_lastname = ''
    this.type_cif = ''
    this.social_reason = social_reason ?? ''
    this.country = ''
    this.priv_policy = priv_policy=="true"? true : false
    this.cif = cif ?? ''
    this.web_page =  ''
    this.prefered_lang =  1
    this.sampol_mail_address =  ''
    this.folder_id =  ''
    this.url_certifications =''
    this.has_certifications =  false
    this.invitation_id = code ?? ''
    this.comment = comment ?? ''
    this.vendor_type =''
    this.treasury_group =  ''

    return { ...this }
  }
}
