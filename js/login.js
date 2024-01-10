/* Este archivo JS gestiona todo lo relacionado con el inicio de sesión */
$(()=>{

    let login = document.querySelector("#user_try_login");
    let email_login = document.querySelector("#email_login");
    let pass_login = document.querySelector("#password_login");


    

    let verified_email, verified_password= false;


    function avoidServerSaturation(){

        
        let res =false;
        let email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/
        let password_pattern = /(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.*\W)+/;


        if(email_pattern.test(email_login.value)){
            verified_email=true;
            
        }   else{
            verified_email=false;
        }
        if(password_pattern.test(pass_login.value)){
            verified_password=true;
            $("#warning_login").text("")
            
        }   else{
            
            verified_email=false;
        }

        

        

        if(verified_email && verified_password ){

            res=true;
        }else{
            res=false;
            $("#warning_login").text("Your email or your password are wrong")
        }
        return res;
    }
    
    let user_credencials = new FormData();
    login.addEventListener("click",function(e){
        e.preventDefault();

        let valid_data = avoidServerSaturation();

       

        if(valid_data){
            

                user_credencials.append("email_login",email_login.value)
                user_credencials.append("password_login",pass_login.value);

                checkUserExistance()
                .then( data=>{

                    if(data.success){
                        
                        let dialog = document.querySelector("#login_dialog");
                        let welcoming_message = dialog.querySelector("p").textContent="Welcome again "+data.name + " "+data.last_name
                            dialog.showModal();

                        let tm = anime.timeline({

                            targets: ".box_1",
                            duration:4000,
                            loop:2,
                            easing:"linear"

                        })
                        tm.add({
                            rotate:360
                        })
                        let tm2 = anime.timeline({
                            targets:".box_2",
                            duration:4000,
                            loop:2,
                            easing:"linear"
                        })
                        tm2.add({
                            rotate:-360
                        })

                        setTimeout(() => {
                            window.location.href="../html/dashboard_registered.php?id="+data.sess;
                        }, 1500);

                    }
                })

        }else{
          
        }
       
    })


    async function checkUserExistance(){

        let response = await fetch("../php/login.php",{
            method:"POST",
            body:user_credencials
        })

        if(response.ok){

            const data = response.json();

            return data;
        }
    }
})