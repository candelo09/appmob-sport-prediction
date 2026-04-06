export interface Participant {
  id: number | undefined;
  fullname: string;
  firstname: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  created_at: Date | undefined;
}

export interface Token {
  access_token: string;
}

export interface Login {
  id: number | undefined;
  fullname: string;
  firstname: string;
  surname: string;
  email: string;
}
