export class CustomerData {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  availableCredit: number;
  created: Date;
  edited: Date;

  constructor(data: {
      id: number;
      name: string;
      email: string;
      phoneNumber: string;
      address: string;
      availableCredit: number;
      created: Date;
      edited: Date;
  }) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.address = data.address;
      this.availableCredit = data.availableCredit;
      this.created = data.created;
      this.edited = data.edited;
  }
}
