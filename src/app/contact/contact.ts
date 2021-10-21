export class Contact {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public verifyPassword: string,
    public verifyEmail: string,
    public name: string,
    public cognome: string,
    public date: Date,
    public accordo: boolean,
    public noAccordo: boolean,
    public figli: number
  ) {}
}
