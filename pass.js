const bcrypt=require('bcrypt');
const pass="lior";
const rounds=20;
bcrypt.hash(pass,rounds,(err,hashstring)=>{
    if(err){
       console.log(err.message);
    }
    else{
        console.log(hashstring);
    }
});

let hashFromDB="$2b$20$mvvk4r1PWvIA9zPlYWskw.79E8aoVAgdAtcMelf0jmtdvByy30z4C";
bcrypt.compare(pass,hashFromDB).then((ans)=>{
   if(ans)
    console.log('ok');
    else
    console.log('not ok');
});