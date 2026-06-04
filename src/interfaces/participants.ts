export interface Participant {
  id: number | undefined;
  fullname: string;
  firstname: string;
  surname: string;
  email: string;
  phone: string;
  perfil: string;
  password: string;
  created_at: Date | undefined;
  position_part: number;
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
  perfil: string;
  phone: string;
  created_at: Date;
}
