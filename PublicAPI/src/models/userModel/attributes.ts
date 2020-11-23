interface UserAttributes {
  id?: number;
  name?: string;
  identity?: string;
  password?: string;
  email?: string;
  gcn: string;
  refresh_token: string;
}

export {
  UserAttributes
}
