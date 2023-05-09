
const User = require("../../models/People");
const jwt = require('jsonwebtoken');


const checkedLogin = (req, res, next) => {
    let cookies = 
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(cookies){
       try {
        token = cookies[process.env.COOKIE_NAME];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // set user data to res.locals
        if(res.locals.html){
            res.locals.loggedInUser = decoded;
        }
        next();
       } catch (error) {
        if(res.locals.html){
            res.redirect('/');
       }else{
              res.status(500).json({
                errors:{
                    common:{
                        msg: 'Authentication failed!',
                    },
                },
              });
       }
    }
}else{
    if(res.locals.html){
        res.redirect('/');
   }else{
          res.status(500).json({
            errors:{
                common:{
                    msg: 'Authentication failed!',
                },
            },
          });
   }
}
};

const redirectLoggedIn = (req, res, next) => {
    let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(!cookies){
        next();
    }else{
        res.redirect('/inbox');
    }
};


function requireRole(roles) {
    return function(req, res, next){
        if(req.user && roles.includes(req.user.role)){
            next();
        }else{

            if(res.locals.html){
                res.render('pages/error', {
                    title: 'Error',
                    message: 'Unauthorized!',
                    info: 'You are not authorized to access this resource. Your current role is ' + req.user.role,
                });
            }else{
            res.status(401).json({
                errors:{
                    common:{
                        msg: 'Unauthorized!',
                        info: 'You are not authorized to access this resource. Your current role is ' + req.user.role,
                    },
                },
              });
            }
        }
    }
};




module.exports = {checkedLogin,redirectLoggedIn,requireRole};