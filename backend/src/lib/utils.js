import jwt from 'jsonwebtoken'

export const ganerateToken=(userid,res)=>{
  const token=jwt.sign({userid},process.env.JWT_SECRET_KEY,{
    expiresIn:'7d',
  });
  res.cookie("token",token,{
    maxAge:7*24*60*60*1000, //MS
    httpOnly:true, // Iska mtlb cookie sirf HTTP requests se access ki ja sakti hai, JavaScript se nahi.
    sameSite:"strict",  //Yeh ensure karta hai ki cookie sirf usi site ke requests ke sath bheji jaye jahan se wo set hui thi.
})
return token;
}