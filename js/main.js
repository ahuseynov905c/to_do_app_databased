
/* Este archivo gestiona todo lo relacionado con la página principal (landing page) */
$(()=>{
   
    let url_search = new URLSearchParams(window.location.search);

        let lng = url_search.get("lng");

        console.log(lng)


        if(lng==="en" || lng===undefined || lng===null){

            $("#english").css("background","#a9a9a9");
            $("#spanish").css("background","transparent");

        }else if(lng==="es"){

            $("#spanish").css("background","#a9a9a9");
            $("#english").css("background","transparent");

        }

        /* LIGHT MODE */

        $("#light_mode").on("change",function(e){
            console.log(e.target.value);
            if(e.target.value==="dark"){
                
                $("body").removeClass("light_body");
                $("#basic_config").removeClass("light_basic_config");
                $(".anim span").css("color","white");
                $("#label_enter_id").css("color","white");
                $("#input_login").css("background","black");
                $("#settings").css("color","rgb(240,240,240");
                $("#identifier h1").css("color","rgb(221,221,221)");
                $("#float1, #float2").css("background","black");
                $("#requirements p, #req").css("color","rgb(221,221,221)");
                $("footer").css("background","rgba(0, 0, 0, 0.153)");
                $("footer div p").css("color","rgb(221,221,221");
            }
            else if(e.target.value==="light"){
                $("body").addClass("light_body");
                $("#basic_config").addClass("light_basic_config");
                $(".anim span").css("color","black");
                $("#label_enter_id").css("color","black");
                $("#input_login").css("background","white")
                $("#settings").css("color","black");
                $("#identifier h1").css("color","black");
                $("#float1, #float2").css("background","rgb(221,221,221)");
                $("#requirements p, #req").css("color","black");
                $("footer").css("background","white");
                $("footer div p").css("color","black");
                
            }
            
            
        })
   

   
    

    /* Show dialog for updating basic configuration */
    let configuration_button = document.querySelector("#settings");
    let dialog_configuration = document.querySelector("#basic_config");
    let dialog_configuration_close = document.querySelector("dialog .close_this_dialog")


    configuration_button.addEventListener("click", ()=>{
        dialog_configuration.showModal();
    })
    dialog_configuration_close.addEventListener("click",()=>{
        dialog_configuration.close()
    })
  

    


    /* User "visual redirection" */

    let div_no_account = document.querySelector("#no_account");
    let div_account = document.querySelector("#account");

        div_no_account.addEventListener("mouseover",function(e){
                document.querySelector("#identifier").style.background="#ffffff22";
        })
        
        div_no_account.addEventListener("mouseleave",function(){
                 document.querySelector("#identifier").style.background="rgba(1,1,1,0)";
        })
    




    /* User data inputs JS validation */

    
            

        


            

    
    
    /* Default User Class*/
        class localUser{
            
            constructor(id){
                this.id=id;
                this.all_tasks =[];
                this.tasksLength=0;
                this.deletedTasks=0;
               
            }
        }
       
        /* This function is used to create a random IDENTIFIER, it is usefull for users to know what we expect from them to add in that input */
        function randomGnum(){
                let word="";
                let l = "abcdefghijklmnñopqrstuvwyxz";
                let u = "ABCDEFGHIJKLMNÑOPQRSTUVWYXZ";
                let n = "123456789"
                let s = "._,;:*@#¿?=)(/&%-"
                let chars = [...l,...u,...n,...s];

                for(let i=0; i<6;i++){
                    
                    let r = chars[Math.floor(Math.random()*chars.length)];
                    word+=r;

                }

                return word;
            }

            
                let randomG = setInterval(() => {

                    $("#id_generator").val(randomGnum)

                }, 1000);
            
            

            $("#id_generator").on("focus",function(){

               clearInterval(randomG);

               $(this).val("");

               /* We check again to reset all the requirements */
               checkValidIdentifier($(this).val())
            })




   /* This function let us know if the identifier is VALID or INVALID based on some patterns */

            let identifier_is_valid=false;
    function checkValidIdentifier(value){
            let v = value;
        
            let array = [false,false,false,false,false];


        /* It has a UPPERCASE */
        if(value.search(/[A-Z]/)!==-1){
            
            array[0]=true;
            anime({
                targets:".sp1", /* the span vinculated with that requirement . In this case a UPPERCASED character */
                duration:1000,
                background:[ {value:"#0cc20c"},{value:"#1c1c1c"},{value:"#0cc20c"}]
            })
        } else{
            array[0]=false;
            anime({
                targets:".sp1",
                duration:1000,
                background:[ {value:"#FF0052"}]
            })
        }

        /* It has a LOWERCASE */
        if(value.search(/[a-z]/)!==-1){

            array[1]=true;
            anime({
                targets:".sp2",
                duration:1000,
                background:[ {value:"#0cc20c"},{value:"#1c1c1c"},{value:"#0cc20c"}]
            })
        } else{
            array[1]=false;
            anime({
                targets:".sp2",
                duration:1000,
                background:[ {value:"#FF0052"}]
            })
        }

        /* It has a number */
        if(value.search(/[0-9]/)!==-1){
            
            array[2]=true;
            anime({
                targets:".sp3",
                duration:1000,
                background:[ {value:"#0cc20c"},{value:"#1c1c1c"},{value:"#0cc20c"}]
            })
        } else{
            array[2]=false;
            anime({
                targets:".sp3",
                duration:1000,
                background:[ {value:"#FF0052"}]
            })
        }

        /* It has a NON-ALPHANUMERIC value */
        if(value.search(/\W/)!==-1){
            
            array[3]=true;
            anime({
                targets:".sp4",
                duration:1000,
                background:[ {value:"#0cc20c"},{value:"#1c1c1c"},{value:"#0cc20c"}]
            })
        } else{
            array[3]=false;
            anime({
                targets:".sp4",
                duration:1000,
                background:[ {value:"#FF0052"}]
            })
            
        }

        /* Its length is 6  */
        if(value.length===6){
            array[4]=true;
             anime({
                targets:".sp5",
                duration:1000,
                background:[ {value:"#0cc20c"},{value:"#1c1c1c"},{value:"#0cc20c"}]
            })
        } else{
            array[4]=false;
            anime({
                targets:".sp5",
                duration:1000,
                background:[ {value:"#FF0052"}]
            })
        }

        /* If every item of the array is true, then we say it is a CORRECT IDENTIFIER */
        if(array[0] && array[1] && array[2] && array[3] && array[4]){
            
            $("#id_generator").addClass("correct_length");

            $("#identifier div").css("opacity","1").removeAttr("disabled");
            
            
            identifier_is_valid=true;
        }else{
            identifier_is_valid=false;
             $("#id_generator").removeClass("correct_length");

             $("#identifier div").css("opacity","0").attr("disabled","");
        }
    }

    /* Call of function checkValidIdentifier() */
         $("#id_generator").on("input",function(){

            checkValidIdentifier($(this).val());

         })






    /* Save ID in the LocalStorage ->This is the function which will allow us to save identifiers in the localStorage memory */
    function saveId(){

        let id = $("#id_generator").val();

       
        /* We iterate through the keys of the localStorage */
        for(let key in localStorage){

            if(localStorage.hasOwnProperty(key)){
                        
                /*  */
                if(key===id){
                    alert("id already created");
                }

            }else if(identifier_is_valid){
                /* If ID is not already created, then will be added to localStorage */
                    let user = new localUser(id);
                        user = JSON.stringify(user)
                            localStorage.setItem(id,user);  /* We use stringify because "user" is a complex structure ( {} ) */

                            console.log(localStorage.getItem(id))

                          
                }
        }
       
    }
    /*Use of function saveId() */
    $("#create_id").on("click",saveId)



    /* If we click over "CREATE-ID" it means that the Idenfitifier is valid, so then we can add some info to the user */
    $("#create_id").on("click",function(){

        isLocalStorage_empty();

        if(identifier_is_valid){
            $("#id_already_created").text("ID created !");
        
        let tm = anime.timeline({

                        targets:"#id_already_created",
                        duration:1000
                    })
                        tm.add({
                            top:20
                        })
                        tm.add({
                            delay:1000,
                            top:-30
                        })

                anime({
                    targets:"#create_id",
                    duration:1000,
                    rotateX:360,
                    opacity:0
                })
        }
                        
    })
    

    /* This function allows us to know if the identifier that the user is typing is ALREADY TAKEN or is AVAILABLE */
    function checkAvailable(){
            console.log(localStorage)
        let id= $("#id_generator").val();
       

        /* Again we iterate through the localStorage OBJECT */
        for(let key in localStorage){

            if(localStorage.hasOwnProperty(key)){
                

                if(key==id){
                    
                    $("#create_id").css("opacity","0").attr("disabled");
                    
                    $("#id_generator").removeClass("correct_length"); /* This, avoid to have a "GREEN color" in the IDENTIFIER if it is already taken */


                    /* Because KEY===ID , it means that the ID that user wants is in use so we give that info to the user */

                    $("#id_already_created").text("ID in use")

                    let tm = anime.timeline({

                        targets:"#id_already_created",
                        duration:1000
                    })
                        tm.add({
                            top:20
                        })
                        tm.add({
                            delay:1000,
                            top:-30
                        })
                }
            }
        }
    }
    /* Call of function checkAvailable() */

    $("#id_generator").on("input",checkAvailable)

   



    /* In the upper right area of the page we have an INPUT which will be the LOGIN bridge. It is going to work by "input" to know if exists, and with "click" to go dashboard */
    function login(){
            
        let id = $("#input_login").val();

        for(let key in localStorage){

            if(localStorage.hasOwnProperty(key)){

                if(id===key){
                    let value = $("#input_login").val();
                    $("#input_login").css("outline","2px solid #0fbf0f")

                        redirect_dashboard(value)
                }
            }
        }
        
    }

    function redirect_dashboard(href){

        window.location.href="dashboard.html?id="+href;
    }
    $("#input_login").on("input",login)
    $("#input_login").on("blur",()=>{
        $("#input_login").css("outline","2px solid rgb(221,221,221)")
    })





   /*Function that gets us to the DASHBOARD of each user*/


    



        /* SETTINGS */
        function settingsDisplay(){

            if($("#dropdown_menu").hasClass("shown")){
                $("#dropdown_menu").fadeOut().addClass("hidden").removeClass("shown")
            }
            else if($("#dropdown_menu").hasClass("hidden")){
                
                $("#dropdown_menu").fadeIn().addClass("shown").removeClass("hidden")
            }
        }
        $("#login span").on("click",settingsDisplay)
      

        /* language */

       












    /* THIS IS GOING THE BE THE AREA WHERE ALL THE "SIMPLE ANIMATIONS" will be located  */

    /* Animation: Separate each letter of the logo text ("d-i-s-c-i-p-l-i-n-e") and then add an animation to each letter contained in a SPAN */

    let element = document.querySelector(".anim");
        element.innerHTML = element.textContent.replace(/\S/g, "<span>$&</span>")


            let tm = anime.timeline({
                targets: ".anim span",
                duration:1000,
                direction:"alternate",
                loop:1
            })

                tm.add({
                    color:"#ff0052",
                    skewY:[{value:360}],
                    delay:anime.stagger(100)
                })


    /* Animation (part1) : Moves a rectangle infinitely */
    let tm2 = anime.timeline({
        targets:"#float1",
        duration:15000,
        easing:"linear",
        loop:true

    })
        tm2.add({
            targets:"#float1",
            rotate:360
        })
    /* Animation (part2) : Moves a rectangle infinitely */  
    let tm3 = anime.timeline({
        targets:"#float2",
        duration:15000,
        easing:"linear",
        loop:true

    })
        tm3.add({
            
            rotate:-360
        })

        function pauseFloats(){
            tm3.pause();
            tm2.pause();
              
            
        }
        function resumeFloats(){
            tm3.play();
            tm2.play();
        }
    
    $("#id_generator").on("click",pauseFloats)
    $("#id_generator").on("blur",resumeFloats)


    /* Animation: Confirmation of deletion */

    

        function isLocalStorage_empty(){
            if(localStorage.length>0){

                $("#step1").text("Delete All My Data");
                $("#step2").html(
                    ` <span class=" a1 material-symbols-outlined">
                        database
                        </span>
                        <span class=" a2 material-symbols-outlined">
                            minimize
                            </span>
                            <span class="a3 material-symbols-outlined">
                                minimize
                                </span>
                                <span class="a4 material-symbols-outlined">
                                    minimize
                                    </span>
                                    <span class="a5 material-symbols-outlined">
                                        delete
                                        </span>
                    `
                )

                $("#step2").show();
            
            
            anime({
                targets:" #delete_my_data",
                scale:1,
                
            })
            anime({
                targets:"#step2 span",
                scale:1
            })
            
            }else if(localStorage.length<1){
                $("#delete_my_data").hide();
            }
        }
        $("#step1").on("click",fnc)
        

       function fnc(){

        let tm4 = anime.timeline({

            duration:200
        })

            tm4.add({
                targets:".a1",
                scale:0,
                complete:function(){
                    $(".a2").text("database")
                }
            })
            tm4.add({
                targets:".a2",
                scale:0,
                complete:function(){
                    $(".a3").text("database");
                }
            })
             tm4.add({
                targets:".a3",
                scale:0,
                complete:function(){
                    $(".a4").text("database");
                }
            })
            tm4.add({
                targets:".a4",
                scale:0,
                complete:function(){
                    $(".a5").text("check");
                }
            })
            tm4.add({
                targets:".a5",
                scale:0,
                delay:2000,
                complete:function(){
                    $("#step2").hide();
                    $("#step1").text("ALL YOUR DATA HAS BEEN REMOVED SUCCESFULLY")
                    localStorage.clear();
                }
            })
            tm4.add({
                delay:2000,
                targets:"#delete_my_data",
                scale:0
            })
       }

        
    
    

        
            
       /* Animation: Settings wheel animated on hover */

       let tm5 = anime.timeline({

            targets: "#login span",
            duration:500,
            easing:"linear",
            loop:1
            })
       function animateSettingWheel(){

       
            tm5.add({
                rotateY:360,
               
            })
       }
       $("#login span").on("click",animateSettingWheel)
        
            
            
            

        


/* Animation: Simple anim that allows us to change the logo image, (different variants of the same image) */
setInterval(() => {
    let rand = Math.floor(Math.random()*3)+1
    
    let image = `../media/logo${rand}.png`;
    
    $("#logo").attr("src",`${image}`)
}, 5000);


/* Animation on classic login mouseenter */
$("#user_registration").on("mouseenter",function(e){
    
    let elem = $("#user_registration .absolute_icon i");
        elem = elem.toArray()[0];
        
        let x = anime({
            targets:elem,
            duration:300,
            easing:"linear",
            keyframes:[
                {translateY:100},
                {translateX:100},
                {translateY:-100},
                {translateX:0},
                {translateY:0},
                
            ]
        })

})
$("#user_login").on("mouseenter",function(e){
    
    let elem = $("#user_login .absolute_icon i");
        elem = elem.toArray()[0];
        
        let x = anime({
            targets:elem,
            duration:300,
            easing:"linear",
            keyframes:[
                {translateY:100},
                {translateX:100},
                {translateY:-100},
                {translateX:0},
                {translateY:0},
                
            ]
        })

})
        
})