/* Este archivo gestiona el registro en la aplicación */


$(()=>{


    
    function small_animation_check_uncheck(elem){
        let tm = anime.timeline({
                    targets: elem,
                    duration:1000,
                    delay:200
                })
                    tm.add({
                        translateY:[30,0]
                    })
    }
    
    let all_verified=false;
    
    $("#name").on("input",()=>{
            
            let elem = $("#name").prev("label").find("i");
        if($("#name").val().length>2){
            $("#name").prev("label").find("i").attr("class","fa-solid fa-check")
            
            small_animation_check_uncheck(elem[0]);
            all_verified=true;
                
        }else{
            $("#name").prev("label").find("i").attr("class","fa-solid fa-caret-down")
            all_verified=false;
            
        }
    })
    $("#last_name").on("input",()=>{
    
        let elem = $("#last_name").prev("label").find("i");
    
        if($("#last_name").val().length>2){
            $("#last_name").prev("label").find("i").attr("class","fa-solid fa-check")
            small_animation_check_uncheck(elem[0]);
            all_verified=true;
        }else{
            $("#last_name").prev("label").find("i").attr("class","fa-solid fa-caret-down")
            all_verified=false;
        }
    })
    $("#email").on("input",()=>{
    
        let elem = $("#email").prev("label").find("i");
        let pattern_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;

        if(pattern_email.test($("#email").val())){

            let fd = new FormData();
                fd.append("is_registered_email",$("#email").val())
            fetch("../php/registration.php",{
                method:"POST",
                body: fd
            })
            .then(response=>response.json())
            .then(data=>{

                /* Available email */
                if(data){
                    $("#email").prev("label").find("i").attr("class","fa-solid fa-check")
                    small_animation_check_uncheck(elem[0]);
                    all_verified=true;
                    $("#warning").text("")
                }else{
            $("#email").prev("label").find("i").attr("class","fa-solid fa-caret-down")
            all_verified=false;
            $("#warning").text("Already in use");
            setTimeout(() => {
                $("#email").val("")
            }, 1000);
                }
            })
            
        }else{
            $("#email").prev("label").find("i").attr("class","fa-solid fa-caret-down")
            all_verified=false;
            $("#warning").text("Invalid email");
           
        }
    })

    $("#password").prev("label").find("i").after().append(`  <i id='info_rules' class="fa-solid fa-circle-info"></i>`)
    $("#info_rules").on("mouseover",function(){

        let dialog = document.querySelector("#showrules");

            dialog.showModal();

            $(document).on("click",()=>{
                dialog.close();
            })
    })
    $("#password").on("input",()=>{
        let elem = $("#password").prev("label").find("i");
        let pattern_pass = /(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.*\W)+/;
        if(pattern_pass.test($("#password").val())){
           
            if($("#password").val().length>8){
                $("#password").prev("label").find("i:first").attr("class","fa-solid fa-check")
                let elem = $("#name").prev("label").find("i");
                all_verified=true;
            }
        }else{
            $("#password").prev("label").find("i:first").attr("class","fa-solid fa-caret-down")
            all_verified=false;
        }

        /* Verify if passwords are equal */
        if($("#password").val()===$("#password_confirmation").val()){
            $("#warning").text("")
        }else{
            $("#warning").text("Passwords are not equal");
        }
    })
    $("#password_confirmation").on("input",()=>{
        let elem = $("#password_confirmation").find("i");
        
        /* Verify if passwords are equal */
        if($("#password").val()===$("#password_confirmation").val()){
            $("#warning").text("");
            $("#password_confirmation").prev("label").find("i").attr("class","fa-solid fa-check")
            

        }else{
            $("#warning").text("Passwords are not equal");
            $("#password_confirmation").prev("label").find("i").attr("class","fa-solid fa-caret-down")
        }
    })
    /*Validation of REGISTRATION */
        
        let user_data = new FormData();
    
        document.querySelector("#add_new_user").addEventListener("click",function(e){
        e.preventDefault();

        if($("#password").val()!=="" && $("#password").val()===$("#password_confirmation").val()){

       
        if(all_verified && $("#name").val().length>2 && $("#last_name").val().length>2 && $("#email").val().length>2 && $("#password").val().length>2){
    
        user_data.append("name",document.querySelector("#name").value);
        user_data.append("last_name",document.querySelector("#last_name").value);
        user_data.append("email",document.querySelector("#email").value);
        user_data.append("password",document.querySelector("#password").value);
    
    
            insertUser()
            .then(data=>{
                let dialog = document.querySelector("#registration_dialog");
    
                if(data.success){
                   
                    dialog.showModal();
    
                    document.querySelector("#registration_dialog_message")
                    .innerHTML = ("<p class='registration_success_message'>Welcome "+user_data.get("name")+ " "+user_data.get("last_name") +".<i class='fa-solid fa-handshake-angle'></i> </p>");
                    document.querySelector("#registration_dialog_message").setAttribute("class","registration_success_message")
                    animation_success_failure_registration(document.querySelector("#registration_dialog_message"))
    
                    let inputs_to_empty = document.querySelectorAll("#form_registration input");
    
                        inputs_to_empty.forEach(input=>{
                            input.value="";
                        })
                }
    
    
                else if(!data.success){
    
                    dialog.showModal();
    
                    document.querySelector("#registration_dialog_message")
                    .innerHTML = ("Error on registration <i class='fa-solid fa-bomb'></i>");
    
                        document.querySelector("#registration_dialog_message").setAttribute("class","registration_failure_message")
    
    
                    /* Failure animation */
                    animation_success_failure_registration(document.querySelector("#registration_dialog_message"))
                    
                }
                all_verified=false;
                $("#form_registration label i").removeClass("fa-check").addClass("fa-caret-down")
            })
            .catch(error=>{
                console.log(error);
            })
        }else{
            alert("Please revise your data!")
        }

        
    } else{
        
    }
        })
    
        
    
    
        async function insertUser(){
    
            let response = await fetch("../php/registration.php",{
                method:"POST",
                body: user_data
            })
    
    
             if(response.ok){
                let data_returned = await response.json();
                return data_returned;
    
            }else{
                console.log("HTTP Error: data cannot be obtained")
            }
        }
    
        /* Function to handle animation on success or failure */
        function animation_success_failure_registration(item){
            let i = item.querySelector("i");
            let tm = anime.timeline({
                        targets: i,
                        duration:3000,
                        delay:1500
                        
                    })
                        tm.add({
                            translateY:-100
                        })
                        
    
                    let tm2 = anime.timeline({
                        targets:item,
                        delay:2000
                    })
                    tm2.add({
                            
                            translateY:500
                        })
                    
                    tm2.add({
                        translateY:0
                    })
                    
                    setTimeout(() => {
                        document.querySelector("#registration_dialog").close()
                    }, 2500);
        }
    
})