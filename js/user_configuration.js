/* Este archivo JS gestiona todo lo que está relacionado con la página personal de cada usuario (Cambio de datos, eliminación de cuenta...) */

$(()=>{

    let url = new URLSearchParams(window.location.search);

    let url_id = url.get("id");

    if(url_id===null || url_id==="" || url_id===undefined){
        window.location.href("index.html");
    }


    /* LANGUAGE -> CHANGE A for JS code */
    lng = url.get("lng");

    if(lng==="en" || lng===undefined || lng===null){

        $(".english").css("borderTop","1px solid black");
        $(".spanish").css("borderTop","1px solid transparent");
        $(".english").css("borderBottom","1px solid black");
        $(".spanish").css("borderBottom","1px solid transparent");

    }else if(lng==="es"){

        $(".spanish").css("borderTop","1px solid black");
        $(".english").css("borderTop","1px solid transparent");
        $(".spanish").css("borderBottom","1px solid black");
        $(".english").css("borderBottom","1px solid transparent");
        

    }

    let english = document.querySelector(".english");
    let spanish = document.querySelector(".spanish");

        function set_language(language,item){

            item.addEventListener("click",function(){

                let fdata = new FormData();
                    fdata.append("set_language",language);
                    fdata.append("id",url_id);


                    fetch("../php/configuration/language.php",{
                        method:"POST",
                        body:fdata
                    })
                    .then(response=>response.json())
                    .then(data=>{
                        console.log(data.success)
                        
                    })
            })
            
        }
        set_language("english",english);
        set_language("spanish",spanish);


    /* DARK AND LIGHT THEMES */

    $("#dark").on("click",function(){

        $("*").css("background","#1c1c1c");
        $("*").css("color","white");

        $("#profile_img").css("background","white");
        $("#profile_img i").css({
            "background":"transparent",
            "color":"black"
        })
        $(".submenu_it").css("border","1px solid white");
        $("#navbar").css("borderBottom","1px solid white");
        $("#options").css("borderRight","1px solid white");
       

        
    })

    $("#light").on("click",function(){
        $("*").css("background","white");
        $("*").css("color","#1c1c1c");

        $("#profile_img").css("background","#1c1c1c");
        $("#profile_img i").css({
            "background":"transparent",
            "color":"white"
        })
        $(".submenu_it").css("border","1px solid black");
        $("#navbar").css("borderBottom","1px solid black");
        $("#options").css("borderRight","1px solid black");
    })
    
       

    let user_name = document.querySelector(".user_name");
    let user_last_name = document.querySelector(".last_name");
    let user_email = document.querySelector(".user_email");

    let new_password = document.querySelector(".new_password");
    let repeat_password = document.querySelector(".repeat_password");
    let previous_password = document.querySelector(".previous_password")

    let dialog_updated = document.querySelector("#updated_user");



    function fetch_user_data(){
        let d_send = new FormData();
            d_send.append("id",url_id);

        fetch("../php/update_user_data.php",{
            method:"POST",
            body:d_send
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            
                user_name.value=data[0].name;
                user_last_name.value=data[0].last_name;
                user_email.value=data[0].email;

                let name = data[0].name;
                let last_name = data[0].last_name;
                let email = data[0].email
                $("#user_name").text(name + " " + last_name);

                


                /* OVERVIEW */
                    $("#info_name").text(name);
                    $("#info_last_name").text(last_name);
                    $("#info_email").text(email)

        })
    }

   
    fetch_user_data();

    /* OVERVIEW */

    $("#open_settings").on("click",function(){
        $("#overview").hide();
        $("#user_settings").fadeIn();
        $(".submenu_it").removeClass("selected");
        $(".settings").addClass("selected");
    })




    /* USER SETTINGS */
    function update_user_basic_data(user_id){

        

        let d_send = new FormData();
            d_send.append("new_name",user_name.value);
            d_send.append("new_last_name",user_last_name.value);
            d_send.append("new_email",user_email.value);
            d_send.append("query_type","update_basic_data");
            d_send.append("id_to_update",user_id)

        fetch("../php/update_user_data.php",{
            method:"POST",
            body:d_send
        })
        .then(response=>response.json())
        .then(data=>{
            
            if(data.success){

               

                    dialog_updated.showModal();

                    setTimeout(() => {
                        dialog_updated.close();
                    }, 1500);
            }

        })


    }


    let update_button = document.querySelector("#btn_update_data");

        update_button.addEventListener("click",function(e){

            e.preventDefault(); 
            update_user_basic_data(url_id);
        })


    
    function update_password_data(user_id){

        console.log("is_running")
        
        let password_pattern = /(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.*\W)+/;
        
        if(password_pattern.test(new_password.value)){


            if(new_password.value===repeat_password.value){

                let d_send= new FormData();
                    d_send.append("id_to_check_password",user_id);
                    d_send.append("previous_password",previous_password.value);
                fetch("../php/update_user_data.php",{

                    method:"POST",
                    body:d_send
                })
                .then(response=>response.json())
                .then(data=>{
                    console.log(data)

                    if(data.password_correct){
                            

                            let d_send_real_update = new FormData();

                                d_send_real_update.append("new_password",repeat_password.value);
                                d_send_real_update.append("id_to_update_password",user_id);
                                d_send_real_update.append("query_type","update_password")

                                fetch("../php/update_user_data.php",{
                                    method:"POST",
                                    body: d_send_real_update
                                })
                                .then(response=>response.json())
                                .then(data=>{

                                    if(data.success){
                                        dialog_updated.showModal();

                                            setTimeout(() => {
                                                dialog_updated.close();
                                                new_password.value="";
                                                repeat_password.value="";
                                                previous_password.value="";
                                            }, 1500);
                                    }else{
                                        console.log(data.message)
                                    }
                                })

                    }
                })
            }

        }
        

    }

    let update_password_button = document.querySelector("#btn_update_password");
        update_password_button.addEventListener("click",function(e){

        e.preventDefault();

        update_password_data(url_id);
})


/* DELETE ACCOUNT */


    function delete_account(user_id){
        $(document).find("#confirmation_input").remove();
        let box_confirmation = document.querySelector("#delete_account");

        let confirmation = `<div id="confirmation_input" class="item_to_update">
            <p>Please write <span class="yes">YES</span> to confirm your request (Porfavor escriba YES para confirmar la acción)</p>
            <input class="input confirm_action_delete_account" type="text" value="NO">
            <button class="confirm_button">CONFIRM</button>

        </div>`
            $(box_confirmation).append(confirmation)
           


    }

    let delete_account_btn = document.querySelector("#btn_delete_account");

    
        delete_account_btn.addEventListener("click",function(e){
            e.preventDefault();


            delete_account(url_id);

            
        })

        $(document).on("click",".confirm_button",()=>{
            

            if($(".confirm_action_delete_account").val()==="YES"){
                console.log(url_id);

                let d_send = new FormData();
                    d_send.append("id_to_delete",url_id);

                fetch("../php/delete_account.php", {
                    method:"POST",
                    body: d_send
                })
                .then(response=>response.json())
                .then(data=>{
                        console.log(data);
                    if(data.success){
                        url.delete("id");
                        window.location.href="../html/index.html";
                    }
                })
            }
        })
































    $("#idd").on("click",function(e){

        /* logout()
            .then(data=>{
                if(data.id_deleted){
                     window.location.href="../html/index.html";
                }
               

            }) */

            let dialog = document.querySelector("#user_configuration");

                dialog.showModal();

                console.log(e.target)

                
    })
    $(".logout").on("click",()=>{
        window.location.href="../html/index.html";
    })
    $(".account_settings").on("click",()=>{
        window.location.href="../html/user_configuration.html?id="+user_id;
    })




    /* CLOSE CONFIGURATION */
    $(".close_configuration").on("click",()=>{


        let tm = anime.timeline({
            targets:".close_configuration",
            
            
            duration:300,
            easing:"linear",
            
        })
        tm.add({
            scale:90,
            rotate:100
        })
        tm.add({
            delay:300,
            scale:1,
            rotate:0
        })
        setTimeout(() => {
            let user_config = document.querySelector("#user_configuration");
                user_config.close();
        }, (500));
    })

    /* MENU CLICK */

    let menu = document.querySelector("#menu");

        menu.addEventListener("click",function(e){
            
            let submenu = e.target.textContent;
            
            $(".submenu_it").removeClass("selected");

            if(submenu==="OVERVIEW" || submenu==="RESUMEN"){
                $("#overview").show();
                
                $("#account_settings, #plans, #user_settings").hide();

                $(e.target).addClass("selected");
            }
            else if(submenu==="USER SETTINGS" || submenu==="CONFIGURACIÓN"){
                
                $("#user_settings").fadeIn();
                
                $("#account_settings, #plans, #overview").hide();

                $(e.target).addClass("selected");
                
            }
            else if(submenu==="PLANS" || submenu==="PLANES"){
                
                $("#plans").fadeIn();
                
                $("#account_settings, #user_settings, #overview").hide();

                $(e.target).addClass("selected");
                
            }
            else if(submenu==="ACCOUNT SETTINGS" || submenu==="CONFIGURACIÓN DE CUENTA"){
                
                $("#account_settings").fadeIn();
                
                $("#user_settings, #plans, #overview").hide();

                $(e.target).addClass("selected");
                
            }
        })



   /* GO BACK TO dashboard */

   $("#logo").on("click",function(){
    window.location.href="dashboard_registered.php?id="+url_id;
   
   })

   $("#en").on("click",function(){


    let currentUrl = window.location.href;
    let url = new URL(currentUrl);

    url.searchParams.delete("lng");
    url.searchParams.set("lng","en");
    window.location.href=url.toString();


})
$("#es").on("click",function(){


    let currentUrl = window.location.href;
    let url = new URL(currentUrl);

    url.searchParams.delete("lng");
    url.searchParams.set("lng","es");
    window.location.href=url.toString();

    
})



   
    
    
})