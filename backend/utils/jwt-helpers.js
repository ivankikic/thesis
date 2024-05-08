import jwt from "jsonwebtoken";

function jwtTokens({ id, username, email }) {
  const accessToken = jwt.sign(
    { id, username, email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { id, username, email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
}

export { jwtTokens };
