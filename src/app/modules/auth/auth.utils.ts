import jwt, { JwtPayload } from 'jsonwebtoken';

//create token function
export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
//--------------------------------------
