const jwt = require('jsonwebtoken');

// Middleware to authenticate token
exports.authenticateToken= (req, res, next)=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        {
            console.error('Token is null');
            return res.sendStatus(401);
        } 
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        {
            console.error('Token verification failed' , err);
            return res.sendStatus(403);
        } 
        console.log('Decoded user from token' , user);
      req.user = user;
      next();
    });
  }
  