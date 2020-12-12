import jwt from "jsonwebtoken";

interface IssuanceToken {
  (user_identity: string, client_id: string): Promise<string>
}

const access: IssuanceToken = async (user_identity, client_id) => {
  const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET!;
  return jwt.sign({
    user_identity,
    client_id,
    type: "access"
  }, secretOrPrivateKey, {
    expiresIn: "2h",
    issuer: "dsm_auth",
  });
}

const refresh: IssuanceToken = async (user_identity, client_id) => {
  const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET!;
  return jwt.sign({
    user_identity, 
    client_id,
    type: "refresh",
  }, secretOrPrivateKey, {
    expiresIn: "14d",
    issuer: "dsm_auth",
  });
}

export {
  access, 
  refresh,
}