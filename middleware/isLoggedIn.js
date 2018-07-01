module.exports= (req,res,next)=>{
    if(!req.user){
        console.log('Unauthorized access');
        req.flash('error', 'You Must Be logged in!');
        res.redirect('/login');
    }else{
        next();
    }
}