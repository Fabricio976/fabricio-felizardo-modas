export interface ICreateUserDTO {
  name: string;
  email: string;
  password_hash: string;
  birth_date?: Date;
}