export class UserLocation {
  public idUser: number;
  public idDistrict: number;
  public district: string;
  constructor(idUser, idDistrict, district) {
    this.idUser = idUser;
    this.idDistrict = idDistrict;
    this.district = district;
  }
}
