
/* Este es el archivo que gestiona toda la lógica de la aplicación cuando el usuario inicia sesión con ID (no registrado) */

$(()=>{
    let first_entrance = true;
    
    /* KNOW if user is logged */
    let user = new URLSearchParams(window.location.search);
    
    let userJSON, userOBJ, userTasks;

  

    
    if(user.get("id")!==null){
       

        user_id = user.get("id");

        /* WE get the value of KEY (id), it returns a JSON */
        userJSON = localStorage.getItem(user.get("id"));

        /* We parse the data to be able to edit it */
        userOBJ = JSON.parse(userJSON);
        /* console.log(userOBJ) */

        /* ARRAY where TASKS will be added  */
        

            /* console.log(userOBJ.tasksLength) */

        
        run_dashboard();
       



        }else{
            /* If not logged, it is driven to the main page to create an ID */
        window.location.href="index.html";
        }

        
   
   
   
    
       


    /* Function that contains all the other funcs */
function run_dashboard(){



function logout(){
    
    window.location.href="index.html";

    

}

$("#idd").on("click",logout)






    /* ADDING THE ID OF THE USER TO THE TOP RIGHT SCREEN */
    $("#control_bar_content #idd ").append("#" + user.get("id"))
     
            
    /*Logic to open and close the FILTERS*/
    function menu_open_close(){
        
            
        
        if($("#menu_handler").text().trim()==="menu_open"){

            $("#menu_handler").text("menu")
            
            anime({
                targets:"#filters",
                left:-300
            })
            $("#all_tasks").css({
                "width":"100%",
               
            })
            $("#filters").css("width","0%")
            
        }else if($("#menu_handler").text().trim()==="menu"){
            $("#menu_handler").text("menu_open");
            anime({

                targets:"#filters",
                left:0
                })
                $("#all_tasks").css("width","80%")
                $("#filters").css("width","20%")
        }
    }

    $("#menu_handler").on("click",menu_open_close)



            /*OBJECT CREATION*/

            /* VARIABLES WHICH WILL CONTAIN THE VALUE OF THE TASK CREATEDE */
            let title = "";
            let description = "";
            let task_type="";
            let flag="";
            let date="";
            let array_hashtags= [];
            

           
            

                

                
            

            class Task {

               static taskID = userOBJ.tasksLength;

                constructor(title,description,array_subtasks,task_type,flag,date,array_hashtags){
                    
                    this.id="task"+Task.taskID;
                    this.title = title;
                    this.description=description;
                    this.array_subtasks=array_subtasks;
                    this.task_type=task_type;
                    this.flag=flag;
                    this.date= date;
                    this.array_hashtags=array_hashtags;
                    this.state="not_started"; /* pending , completed, expired, deleted */
                    this.expired=false;   
                }

                static incrementID(){   
                    Task.taskID++;

                    userOBJ.tasksLength = Task.taskID;

                    let updated = JSON.stringify(userOBJ);

                     localStorage.setItem(user_id,updated);

                     console.log(localStorage.getItem(user_id).tasksLength)

                }

            }

            
            


            /*DATA RECOLECT 1:  Function that gets the TITLE, DESCRIPTION AND SUBTASKS ADDED BY THE USER */
            function getData_title_description_subtasks(){

                let i=1;
                /* TITLE */
                title = $("#d_title").val();
                

                /* DESCRIPTION */
                description = $("#d_description").val();

                /* SUBTASKS */
                array_subtasks = [];

                ($(".d_subtask").toArray()).forEach((subtask)=>{

                    array_subtasks.push(subtask.value)
                    i++;
                })
                checkData();

                
                
                
                            

            }

            $("#d_add_task").on("click",getData_title_description_subtasks)
            $("#d_add_task").on("click",function(){
                window.location.href= "dashboard.html?id="+user_id;
                
            })
            
            $("#d_cancel").on("click",function(){
                $("#create_task").fadeOut();
            })
            /* $("#d_add_task").on("click",showDataCollected) */






            /*DATA RECOLECT 2: GET THE TASK TYPE*/
            task_type="";

                /* If user focus INPUT, type_value is empty again */
            $("#d_types li input").on("focus",function(e){
                    task_type="";

                    /* We change type_value value on INPUT */
                    $(this).on("input",function(){
                        task_type = $(e.target).val();
                    })
            })

            /* If user clicks any LI, we set type_value with its ID */
            $("#d_types").on("click","li",function(e){
                let target_element = e.target;
                let $lis = $("#d_types li").toArray();

                $lis.forEach( (li)=>{
                    $(li).removeClass("selected");
                })
                    $(target_element).addClass("selected");

                    $lis.forEach( (li)=>{
                        let $li = $(li);

                        if($li.hasClass("selected")){
                            $li.css("background","#a2cfe2AA")
                        }else{
                            $li.css("background","transparent")
                        }
                        
                    })
                        task_type = e.target.id;
            })



            /* DATA RECOLECT 3: Function that gets the FLAG of the TASK */
            function getDataFlags(target){


                let value = target.id
                let $lis = $("#d_flags li").toArray();

                $lis.forEach((li)=>{
                    if($(li).attr("id")!==value){
                        
                        $(li).css("background","transparent");
                        flag= value
                    }else{

                        $(li).css("background","black");
                    }
                })
                





            }   

            $("#d_flags").on("click","li",function(e){
                getDataFlags(e.target)
            })


            /* Add a HASH in the beggining of the input */
            function hashtagOnInput(the_input){
                
                $(the_input).val("#")


            }

            $("#d_hashtags").on("focus","input",function(e){
                hashtagOnInput(e.target);
               
            })

            /* DATA RECOLECT 4: FUNCTION TO GET THE HASHTAGS OF THE USER */
            
           function get_hashtags(){
            let values =[];
            let hashs = document.querySelectorAll("#d_hashtags input");
                hashs.forEach(hash=>{
                    values.push(hash.value)
                })

            array_hashtags= [...values];
            
           }
           $("#d_hashtags input").on("input",get_hashtags)

            

            /*DATA RECOLECT 5:  FUNCTION TO GET DATA OF DATE */
            function getDataDate(){

                $("#d_date").on("change",function(e){
                    date = $(this).val();
                        
                })
            }
                    
           
            getDataDate();
           
                
/* END OF INPUT RECOLLECTION */




















           
            
            /* Function that checks if REQUIRED inputs are filled ( TITLE and SUBTITLE) */
            function checkData(){
            

                if(title!=="" && description!==""){

                    createObject();
                    
                    
                    


                }
            }


            /* FUNCTION THAT CREATES A NEW INSTANCE OF TASK. Then it is saved in localStorage inside of TASK array */
            function createObject(){
                
                let object = new Task(title,description,array_subtasks,task_type,flag,date,array_hashtags);
                userOBJ.all_tasks.push(object);
                Task.incrementID();


                let updateStorage = JSON.stringify(userOBJ);

                    localStorage.setItem(user_id,updateStorage)
                    


                
            }
                  


            $(document).on("click",".task .show_all_task_content",function(){
                let $parent = $(this).closest(".task");

                
                let id= $parent.attr("id");

                let $state = $parent.find("span.show_all_task_content");
                
                /* revisar */
                if($state.text().trim()==="expand_less"){
                    $(this).parent().parent().css({
                        "height":"80px",
                       
                    });
                    $(this).parent().parent().find("ul").hide();
                    $state.text("expand_more")
                }
                else if($state.text().trim()==="expand_more"){
                    $(this).parent().parent().find(".hideme").fadeIn();
                    $(this).parent().parent().css({
                        "height":"auto",
                        
                    });
                    
                    $state.text("expand_less")
                }
               
                
            })
           

            /* get TASKS and CREATE HTML*/
            function task_structure(id, title,desc,flag,task_type,date,array_subtasks, state){
                

                let subtasks_li = "";
                    subtasks_li+= desc
                array_subtasks.forEach( (subt)=>{

                    if(subt.length>2){
                        subtasks_li += `<li>${subt}</li>`
                    }
               
                })
                let checked;
                if(state==="started"){
                    checked = "checked";
                }
                else if(state==="not_started"){
                    checked="";
                }

                let started="";
                if(state!=="completed"){
                     started = `<div class="complete_box">
                    <label for="">Started? </label>
                    <input class="completed" type="radio" ${checked}>
                </div>`

                
                }

                
            
                    
                let task = `<div id="${id}" class="task ${state}_sty">
                        
                        ${started}
                        
                        <h1 class="title">${title}</h1>
                        
                        <p class="flag">${flag}</p>
                        <p class="task_type">${task_type}</p>
                        <div class="config">
                        <span  class="material-symbols-outlined show_all_task_content">
                            expand_more
                        </span>
                        <span  class="material-symbols-outlined remove_task">
                            backspace
                        </span>
                        </div>

                        <ul class="hideme">
                            <h1>Description and Subtasks</h1>
                            ${subtasks_li}
                            
                        </ul>
                        <div class="date_and_done">
                            <p class=dd_state>State: ${state}</p>
                            <p>${date}</p>
                            <p>Is Done</p>
                            <input class="task_done" type="checkbox">
                        </div>






                        </div>`
                        
                        return task;
            }













            /* FILTER TASKS BY STATE */
            function setExpired(){
                
                let userJSON = localStorage.getItem(user_id);
                let userOBJ = JSON.parse(userJSON);
                
                let all_tasks = userOBJ.all_tasks;
                    
                all_tasks.forEach( (task)=>{
                   
                        let date = new Date();

                        let date2 = new Date(task.date);

                        console.log(date2);

                        if(date2<date){
                             task.state="expired";

                            localStorage.setItem(user_id,JSON.stringify(userOBJ))
                            $("#"+task.id).css("border","3px solid #ff0052")
                            $("#"+task.id).find(".task_done ").hide();
                            $("#"+task.id).find(".task_done").prev().hide();
                            $("#"+task.id).find(".complete_box").hide();
                            $("#"+task.id).css("opacity","0.4") 
                        }
                          
                            checkState_and_addStyle();

                })
            }
            
            function get_all_tasks(){
                $(document).find("#all_tasks_in").empty();
                let userJSON = localStorage.getItem(user_id);
                let userOBJ = JSON.parse(userJSON);
                
                let all_tasks = userOBJ.all_tasks;
                    
                all_tasks.forEach( (task)=>{
                   
                            
                            let new_task = task_structure(task.id,task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks, task.state);
                            $(document).find("#all_tasks_in").append(new_task)
                            $(".task ul").hide();
                        
                        setExpired();

                })
                
               
            }

            /* Initial state of the page */
                          get_all_tasks();  
                         

            /* Adds style to elements based in its STATE */
            function checkState_and_addStyle(){
                let userJSON = localStorage.getItem(user_id);
                let userOBJ = JSON.parse(userJSON);
                
                let all_tasks = userOBJ.all_tasks;
                all_tasks.forEach( (task)=>{
                        
                    if(task.state==="completed"){

                        $("#"+task.id).css("border","3px solid #96D38C");
                        $("#"+task.id).find(".date_and_done input").prop("checked",true);
                        $("#"+task.id).find(".started input").prop("disabled",true);
                    }
                    if(task.state==="started"){

                    $("#"+task.id).css("border","3px solid #F8E71C");

                    $("#"+task.id).find(".date_and_done input").prop("checked",false);

                    
                    }
                    if(task.state==="not_started"){
                        $("#"+task.id).css("border","1px dashed #A2CFE2");
                    }
                    if(task.expired===true){
                        $("#"+task.id).css("border","3px solid #ff0052")
                        $("#"+task.id).find(".task_done ").hide();
                        $("#"+task.id).find(".task_done").prev().hide();
                        $("#"+task.id).find(".complete_box").hide();
                        $("#"+task.id).css("opacity","0.4")

                    }
                })
            }
                        checkState_and_addStyle();
           

            $("#not_started_tasks,#pending_tasks, #completed_tasks, #specific_filters, #show_by_date").hide();
                
                   
            function get_not_started_tasks(){
                $("#not_started_tasks").empty();
                
                
                let userJSON = localStorage.getItem(user_id);
                let userOBJ = JSON.parse(userJSON);
                
                let all_tasks = userOBJ.all_tasks;
                all_tasks.forEach( (task)=>{

               if(task.state==="not_started"){
                 let new_task = task_structure(task.id, task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks,task.state );

                $(document).find("#not_started_tasks").append(new_task)
                $(".task ul").hide();
               }
                })

            }

            function get_pending_tasks(){
                $("#pending_tasks").empty();
                
                
                userOBJ= JSON.parse(localStorage.getItem(user_id))
                
                let all_tasks = userOBJ.all_tasks;

                

               
                
                all_tasks.forEach( (task)=>{
                        
                    if(task.state==="started"){
                        
                        let new_task = task_structure(task.id, task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks,task.state );

                    $(document).find("#pending_tasks").append(new_task)
                    $(".task ul").hide();
                    }
                    
                        
               
            
                })
                

                

            }

            
            

            
            function get_completed_tasks(){
                $("#completed_tasks").empty();
                
                
                let userJSON = localStorage.getItem(user_id);
                let userOBJ = JSON.parse(userJSON);
                
                let all_tasks = userOBJ.all_tasks;
                all_tasks.forEach( (task)=>{

                    if(task.state==="completed"){
                        let new_task = task_structure(task.id, task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks,task.state );

                        $(document).find("#completed_tasks").append(new_task)
                        $(".task ul").hide()
                    }
               ;
                })
            }

            function get_expired_tasks(){
                $("#expired_tasks").empty();
                let userJSON = localStorage.getItem(user_id);
                let userOBJ = JSON.parse(userJSON);
                
                let all_tasks = userOBJ.all_tasks;
                all_tasks.forEach( (task)=>{
                    
                    /* Today */
                    let date = new Date();

                    /* Task date  */
                    let date2 = new Date(task.date)
                        

                        

                    if(date2.toDateString()<date.toDateString() && (task.state==="not_started" || task.state==="expired")){
                        task.expired=true;
                        task.state="expired";
                        let new_task = task_structure(task.id, task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks,task.state );
                        
                        $(document).find("#expired_tasks").append(new_task) 
                        $(".task ul").hide()

                        localStorage.setItem(user_id,JSON.stringify(userOBJ));

                        
                    }
               ;
                })
            }

            function get_today_tasks(){
                $("#today_tasks").empty();
                let userJSON = localStorage.getItem(user_id);
                let userOBJ = JSON.parse(userJSON);
                
                let all_tasks = userOBJ.all_tasks;
                all_tasks.forEach( (task)=>{
                    
                    /* Today */
                    let date = new Date();

                    /* Task date  */
                    let date2 = new Date(task.date)
                        

                            console.log(date2.toDateString()==date.toDateString());
                            

                    if(date2.toDateString()===date.toDateString()){
                        
                        
                        let new_task = task_structure(task.id, task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks,task.state );
                        
                        $(document).find("#today_tasks").append(new_task) 
                        $(".task ul").hide()

                        localStorage.setItem(user_id,JSON.stringify(userOBJ));

                       
                    }
               ;
                })
            }

           
           
            
                
            function filtering(filter){
               
                function setHeaderText(text){
                    $("#all_tasks_header h1").text(text)
                    anime({
                        targets: "#all_tasks_header h1",
                        translateY:[50,0]
                    })
                }
                function hideTaskSection(section){
                    $(section).empty().hide();
                }
                function isNowActive(menu_item){
                    $(menu_item).addClass("active")
                }
                function isNowInactive(arr_inactives){

                    for(let i=0; i<arr_inactives.length;i++){

                        $(arr_inactives[i]).removeClass("active")
                    }

                }
                function show_this_section(section){
                    $(section).fadeIn();
                }

                
                if(filter=="show_not_started"){
                    setHeaderText("NOT STARTED")
                        anime({
                            targets: "#show_not_started span",
                            duration:1000,
                            translateX:[-100,0],
                        })
                    hideTaskSection($("#all_tasks_in"))
                    hideTaskSection($("#pending_tasks"))
                    hideTaskSection($("#filtered_tasks"))
                    hideTaskSection($("#completed_tasks"))
                    hideTaskSection($("#specific_filters"))
                    hideTaskSection($("#expired_tasks"))
                    hideTaskSection($("#today_tasks"))
                    $("#show_by_date").hide();
                    
                   
                    checkState_and_addStyle()
                    get_not_started_tasks();
                        show_this_section("#not_started_tasks")
                    isNowActive("#show_not_started")
                    isNowInactive(["#show_all", "#show_pending", "#show_completed", "#show_date", ])
                    

                }
                else if(filter==="show_all"){
                    setHeaderText("ALL TASKS")
                    get_all_tasks();
                    anime({
                        targets: "#show_all span",
                        duration:1000,
                        translateX:[-100,0],
                    })
                    hideTaskSection($("#not_started_tasks"))
                    hideTaskSection($("#pending_tasks"))
                    hideTaskSection($("#filtered_tasks"))
                    hideTaskSection($("#completed_tasks"))
                    hideTaskSection($("#specific_filters"))
                    hideTaskSection($("#expired_tasks"))
                    hideTaskSection($("#today_tasks"))
                    $("#show_by_date").hide();
                    

                    show_this_section("#all_tasks_in");
                    
                    isNowActive("#show_all");
                    
                    isNowInactive(["#show_not_started", "#show_pending", "#show_completed", "#show_date"])
                }

                else if(filter==="show_pending"){
                    setHeaderText("STARTED TASKS (NOT ENDED)")
                    get_pending_tasks();
                    anime({
                        targets: "#show_pending span",
                        duration:1000,
                        translateX:[-100,0],
                    })
                    hideTaskSection($("#not_started_tasks"))
                    hideTaskSection($("#all_tasks_in"))
                    hideTaskSection($("#filtered_tasks"))
                    hideTaskSection($("#completed_tasks"))
                    hideTaskSection($("#specific_filters"))
                    hideTaskSection($("#expired_tasks"))
                    hideTaskSection($("#today_tasks"))
                    $("#show_by_date").hide();
                    

                    show_this_section("#pending_tasks")
                    
                   isNowActive("#show_pending")
                   isNowInactive(["#show_not_started", "#show_all", "#show_completed", "#show_date"])
                }
                else if(filter==="show_completed"){
                    setHeaderText("COMPLETED TASKS")
                    get_completed_tasks();
                    anime({
                        targets: "#show_completed span",
                        duration:1000,
                        translateX:[-100,0],
                    })
                    hideTaskSection($("#not_started_tasks"))
                    hideTaskSection($("#pending_tasks"))
                    hideTaskSection($("#filtered_tasks"))
                    hideTaskSection($("#all_tasks_in"))
                    hideTaskSection($("#specific_filters"))
                    hideTaskSection($("#expired_tasks"))
                    hideTaskSection($("#today_tasks"))
                    $("#show_by_date").hide();
                    

                    show_this_section("#completed_tasks");
                    
                    isNowActive("#show_completed");
                    $("#show_not_started, #show_all, #show_pending, #show_filtered").removeClass("active")
                    isNowInactive(["#show_not_started", "#show_all", "#show_pending", "#show_date"])
                }
                else if(filter==="show_date"){
                    setHeaderText("SELECT A MONTH")

                    hideTaskSection($("#not_started_tasks"))
                    hideTaskSection($("#pending_tasks"))
                    hideTaskSection($("#filtered_tasks"))
                    hideTaskSection($("#all_tasks_in"))
                    hideTaskSection($("#completed_tasks"))
                    hideTaskSection($("#specific_filters"))
                    hideTaskSection($("#expired_tasks"))
                    hideTaskSection($("#today_tasks"))

                    show_this_section("#show_by_date")
                    
                    isNowActive("#show_date");
                    isNowInactive(["#show_all","#show_not_started","#show_completed","#show_pending"])
                }
                else if(filter==="show_expired"){
                    setHeaderText("EXPIRED TASKS")
                    get_expired_tasks();
                    anime({
                        targets: "#show_expired span",
                        duration:1000,
                        translateX:[-100,0],
                    })
                    hideTaskSection($("#not_started_tasks"))
                    hideTaskSection($("#pending_tasks"))
                    hideTaskSection($("#filtered_tasks"))
                    hideTaskSection($("#completed_tasks"))
                    hideTaskSection($("#specific_filters"))
                    hideTaskSection($("#all_tasks_in"))
                    hideTaskSection($("#today_tasks"))
                    $("#show_by_date").hide();
                    

                    show_this_section("#expired_tasks");
                    
                    isNowActive("#show_expired");
                    
                    isNowInactive(["#show_not_started", "#show_pending", "#show_completed", "#show_date", "#show_all"])
                } else if(filter==="show_today"){
                    setHeaderText("LAST DAY")
                    get_today_tasks();
                    anime({
                        targets: "#show_today span",
                        duration:1000,
                        translateX:[-100,0],
                    })
                    hideTaskSection($("#not_started_tasks"))
                    hideTaskSection($("#pending_tasks"))
                    hideTaskSection($("#filtered_tasks"))
                    hideTaskSection($("#completed_tasks"))
                    hideTaskSection($("#specific_filters"))
                    hideTaskSection($("#all_tasks_in"))
                    hideTaskSection($("#expired_tasks"))
                    $("#show_by_date").hide();
                    

                    show_this_section("#today_tasks");
                    
                    isNowActive("#show_today");
                    
                    isNowInactive(["#show_not_started", "#show_pending", "#show_completed", "#show_date", "#show_all","#show_expired"])
                }
               
            }
            /* FILTER MENU BEHAVIOUR */
            $("#filters p").on("click",function(){

                filtering($(this).attr("id"));
                checkState_and_addStyle();
            })

            /* OPEN - CLOSE specific filters */

           







            /* What happens when user STARTS the TASK with checkbox .completed */
            function startTask(task_id){
                
                let ischecked = false;
                let all_tasks = userOBJ.all_tasks;
                    

                    all_tasks.forEach( task=>{


                        if(task.id===task_id){
                            

                           
                            if(task.state==="not_started"){
                                    task.state="started";
                                    ischecked=true;

                                    let tm = anime.timeline({
                                        targets:"#"+task_id,
                                        duration:300
                                        
                                       })
    
                                        tm.add({
                                            scale:0.9                                                
                                        })
                                        tm.add({
                                            scale:1,
                                            
                                            
                                        })
                                    
                            }
                            

                            
                           
                        }
                    })
                    
                    return ischecked;
            }


            $(document).on("click","input.completed",function(){
                
                    let box_to_update = $(this).parent().parent().parent().attr("id");

                    
                        $("#all_tasks_header span:eq(0)").text("refresh")
                    
                    refreshPage(box_to_update)
                    
                   

                let ischecked = startTask($(this).parent().parent().attr("id"));
                    
                if(ischecked){
                    
                localStorage.setItem(user_id,JSON.stringify(userOBJ));
                userOBJ= JSON.parse(localStorage.getItem(user_id))

                
                }
                checkState_and_addStyle();
                get_stats_values();
            })

            function refreshPage(box){
                
                $("#refresh").on("click",function(){
                    
                    anime({
                        targets:"#refresh",
                        rotateY:360
                        
                    })
                       
                    
                    if(box==="pending_tasks"){
                        
                        get_pending_tasks();
                        checkState_and_addStyle();
                    }
                    else if(box=="not_started_tasks"){
                        get_not_started_tasks();
                        checkState_and_addStyle();
                    }else if(box=="all_tasks_in"){
                        get_all_tasks();
                        checkState_and_addStyle()
                    }
                })
            }





            /* What happens when user ENDS task clicking on .done checkbox */
            function endTask(task_id){
                let isDone = false;
                let all_tasks = userOBJ.all_tasks;
                    
                    console.log(all_tasks)
                    all_tasks.forEach( task=>{


                        if(task.id===task_id){
                            

                           
                            if(task.state==="not_started" || task.state==="pending" || task.state==="started"){
                                    task.state="completed";
                                    isDone=true;

                                   let task_ =  $("#"+task_id)[0];

                                   

                                   let tm = anime.timeline({
                                    targets:task_,
                                    duration:300
                                    
                                   })

                                    tm.add({
                                        scale:0.9                                                
                                    })
                                    tm.add({
                                        scale:1,
                                        
                                        
                                    })
                                    tm.add({
                                        borderColor:"#96D38C"
                                    })
                                    

                                    
                            }
                            
                            

                            
                           
                        }
                    })

                    return isDone;
            }

            $(document).on("click",".date_and_done input",function(e){
                let box_to_update = $(this).parent().parent().parent().attr("id");

                if(box_to_update!=="all_tasks_in"){
                    $("#all_tasks_header span:eq(0)").text("refresh")
                }
                refreshPage(box_to_update)
                

                let task = $(this).parent().parent().attr("id");
                
                $("#"+task).find(".complete_box").fadeOut()
                let isDone = endTask($(this).parent().parent().attr("id"));
                    


                if(isDone){
                    localStorage.setItem(user_id,JSON.stringify(userOBJ));
                userOBJ= JSON.parse(localStorage.getItem(user_id))

                
                    
                }
                checkState_and_addStyle()

            })
         


                /* MONTH - DAY - YEAR */
                function month_selected(clicked_month){
                    let identif = $(clicked_month).attr("id")
                    $(clicked_month).css("background","black");
                    $("#show_by_date .typemonth:not(#"+identif +")").css("background","transparent")
                    
                }
                $(document).on("click",".typemonth",function(e){
                    month_selected($(e.target))
                })
                function months(month){
                    
                    let date = new Date();

                    let theyear = date.getFullYear();

                    function numberOfDays(m){
                        m = parseInt(m)
                        
                        if(m===1 || m===3 || m===5 || m===7 || m===8 || m===10 || m===12){

                            return 31;
                        }
                        else if(m===4 || m===6 || m===9 || m===11){
                            return 30;
                        }
                        else if(m===2){
                            return 29;
                        }
                    }

                    let selected_date = new Date(theyear,month-1);
                    
                    
                    let theMonthHas = numberOfDays(selected_date.getMonth()+1);


                    function createVirtualMonth(month){
                        
                        let add_=""
                        for(let i=1; i<=theMonthHas;i++){
                            add_+=`<div class=d${i}>${i}</div>`
                        }
                        
                        $("#month").html(add_);
                    }
                    function addTasks_on_days(){

                        let userJSON = localStorage.getItem(user_id);
                        let userOBJ = JSON.parse(userJSON);

                        let all_tasks = userOBJ.all_tasks;

                        all_tasks.forEach( (task)=>{

                            let d = new Date(task.date);
                            let month_ = d.getMonth()+1;
                            let day_ = d.getDate();

                            
                            if(month_==month){

                                if(task.state==="not_started"){
                                    $(".d"+day_).append("<div class='mini_taskNON'></div>")
                                    
                                }
                                else if(task.state==="started"){
                                    $(".d"+day_).append("<div class='mini_taskSTART'></div>")
                                }else if(task.state==="completed"){
                                    $(".d"+day_).append("<div class='mini_taskCOM'></div>")
                                }
                                
                            }

                        })
                    }

                    function add_tasks_of_this_month(){
                        let all_tasks_of_month = "";
                        let userJSON = localStorage.getItem(user_id);
                        let userOBJ = JSON.parse(userJSON);

                        let all_tasks = userOBJ.all_tasks;

                        all_tasks.forEach( (task)=>{

                            let d = new Date(task.date);
                            let month_ = d.getMonth()+1;
                            let day_ = d.getDate();

                            if(month_==month){
                                
                                if(task.state==="not_started"){
                                    all_tasks_of_month+= `<div class="mt_titleNON"> *${task.title} (${day_})</div>`
                                }
                                else if(task.state==="started"){
                                    all_tasks_of_month+= `<div class="mt_titleSTART"> *${task.title} (${day_})</div>`
                                }
                                else if(task.state==="completed"){
                                    all_tasks_of_month+= `<div class="mt_titleCOM"> *${task.title} (${day_})</div>`
                                }
                               
                                
                                
                            }
                            $("#titles_here").html(all_tasks_of_month);
                            $("#titles_here").fadeIn();
                    })
                        
                }

                    createVirtualMonth(theMonthHas);
                    addTasks_on_days()
                    add_tasks_of_this_month();
                }

                $(document).on("click","#show_by_date div.typemonth",function(){

                    months($(this).attr("id"));
                })




                /* FILTERS (A,B,C,D,...) */
                let filter_selected="";
                function selectFilterType(target){

                    filter_selected= $(target).val();
                    
                    $("#type_of_filter p").text("Filtering by: "+$(target).val());

                    anime({
                        targets: "#type_of_filter p",
                        duration:1000,
                        translateY:[50,0]
                    })
                    $("#all_tasks_header h1").text("Filtered by: "+$(target).val())


                    if(filter_selected==="IMPORTANCE"){

                        let elem ="";

                            elem +="FILTERING BY: IMPORTANCE"
                            elem += "<div> 0 - 3 - 6 - 9 - 10</div>"
                        $("#type_of_filter p").html(elem);
                    }
                        let tgg = $(target)[0];
                        
                        
                        let t = anime.timeline({
                            targets:tgg,
                            duration:500
                        })
                            t.add({
                                translateY:-5,
                            })
                            t.add({
                                translateY:0
                            })

                }


                $(document).on("click","#type_of_filter .filter input",function(e){
                        selectFilterType($(e.target))
                })



                function specificFilters(){
                
                    $("#all_tasks_in ,#not_started_tasks, #pending_tasks, #completed_tasks, #show_by_date").hide()
                    $("#specific_filters").fadeIn();
                    
                    
                }


                function noneActive(){
                    $(".active").removeClass("active")
                }

                $("#search").on("input",specificFilters)
                $("#search").on("click",noneActive)
                $("#search").on("input",function(){
                    
                if($("#search").val()==="" || $("#search").val().length===0){
                    $("#specific_filters").hide();
                    $("#all_tasks_in").show();
                }
                
                
                })
    



               
                function filterBy(type){
                    
                    let userJSON = localStorage.getItem(user_id);
                    let userOBJ = JSON.parse(userJSON);
                    
                    let all_tasks = userOBJ.all_tasks;

                    
                    if(filter_selected==""){
                        $("#type_of_filter p").text("PLEASE SELECT OPTION")
                        
                        let tg = $("#type_of_filter .filter input").toArray();
                        
                        let tm = anime.timeline({
                            targets:tg,
                            duration:300,
                            
                        })

                            tm.add({
                                scale:0
                            })
                            tm.add({
                                scale:1
                            })
                    
                                
                        }
                    else{

                        
                       if(filter_selected=="FAMILY TYPE"){

                        show_tasks_of_family_type();
                       }
                       else if(filter_selected=="IMPORTANCE"){
                        show_tasks_by_importance();
                       }
                       else if(filter_selected=="DESCRIPTION"){
                        show_tasks_by_description();
                       }
                       else if(filter_selected==="HASHTAG"){
                        show_tasks_by_hashtags();
                       }
                       else if(filter_selected=="TITLE"){
                        show_tasks_by_title()
                       }
                       else if(filter_selected=="SUBTASKS"){
                            show_by_subtasks();
                       }




                    } /* end else */
                    
                   function show_tasks_of_family_type(){
                        let content_to_insert="";
                        let query = $("#search").val();
                        
                        all_tasks.forEach( task=>{

                            if(task.task_type.startsWith(query) && query.length>0){
                            
                                let tsk = task_structure(task.id,task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks, task.state)
                                content_to_insert+=tsk;
                            }
                            $("#specific_filters").html(content_to_insert)
                             $(".task ul").hide();
                        })
                   }

                   $(document).find(".started_sty").css("border","3px solid yellow")
                   $(document).find(".completed_sty").css("border","3px solid #96D38C")
                   $(document).find(".not_started_sty").css("border","3px solid #A2CFE2")
                   function show_tasks_by_importance(){
                    let content_to_insert="";
                    let query = $("#search").val();
                    
                    all_tasks.forEach( task=>{

                        if(task.flag.startsWith(query) && query.length>0){
                        
                            let tsk = task_structure(task.id,task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks, task.state)
                            content_to_insert+=tsk;
                        }
                        $("#specific_filters").html(content_to_insert)
                       
                        $(".task ul").hide();
                        
                    })

                    
               }
               function show_tasks_by_description(){
                let content_to_insert="";
                let query = $("#search").val();
                
                
                all_tasks.forEach( task=>{

                    if(task.description.startsWith(query) && query.length>0){
                       
                        let tsk = task_structure(task.id,task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks, task.state)
                        content_to_insert+=tsk;
                    }
                    $("#specific_filters").html(content_to_insert)
                    $(".task ul").hide();
                })
           }

                function show_tasks_by_hashtags(){
                    let content_to_insert="";
                    let query = $("#search").val();
                    
                    let all_hashtags = 
                    all_tasks.forEach ( task=>{
                        
                        let array = task.array_hashtags;

                        
                    

                        array.forEach(hashtag_indiv=>{
                                
                            if(hashtag_indiv.toLowerCase()=="#" + query){
                                
                                let tsk =  task_structure(task.id,task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks, task.state)
                                content_to_insert+=tsk
                            }
                            $("#specific_filters").html(content_to_insert)
                            $(".task ul").hide();
                        })

                    })
                   
                    
                }
    
                function show_tasks_by_title(){
                    let content_to_insert="";
                    let query = $("#search").val();
                    
                    
                    all_tasks.forEach( task=>{
    
                        if(task.title.startsWith(query) && query.length>0){
                            
                            let tsk = task_structure(task.id,task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks, task.state)
                            content_to_insert+=tsk;

                           
                            
                        }
                        
                        $("#specific_filters").html(content_to_insert)
                        $(".task ul").hide();


                        
                })
                
            }
            

            function show_by_subtasks(){
                let content_to_insert="";
                let query = $("#search").val();
                query = query.toLowerCase();
                
                
                all_tasks.forEach ( task=>{
                    
                    let array = task.array_subtasks;

                    
                

                    array.forEach(subtasks_indiv=>{
                            
                            subtasks_indiv= subtasks_indiv.toLowerCase();
                        if(subtasks_indiv.startsWith(query)){
                            
                            let tsk =  task_structure(task.id,task.title,task.description,task.flag,task.task_type,task.date, task.array_subtasks, task.state)
                            content_to_insert+=tsk
                        }
                        $("#specific_filters").html(content_to_insert)
                        $(".task ul").hide();
                    })

                })
            }
                }
                $("#search").on("input",function(e){
                    filterBy($(e.target).val())
                    
                })


               

                function delete_task(taskk){

                        show_Deleted_message();
                        $("#"+taskk).fadeOut();

                        let taskIndex = taskk.substring(4,5);
                       

                        let userJSON = localStorage.getItem(user_id);
                        let userOBJ = JSON.parse(userJSON);

                        let all_tasks = userOBJ.all_tasks;
                            
                            
                        
                        

                        all_tasks.forEach(task=>{
                            if(task.id==taskk){
                                
                                
                                

                                all_tasks.splice(all_tasks.indexOf(task),1);

                                localStorage.setItem(user_id,JSON.stringify(userOBJ))
                                
                               
                            }
                        })
                }




                function show_Deleted_message(){
                    let tm = anime.timeline({

                        targets:"#deleted_message",
                        duration:1000
                    })
                        tm.add({
                            left:0,
                        })
                        tm.add({
                            left:-140,
                        })
                }
                

                $(document).on("click",".remove_task",function(e){

                    delete_task($(e.target).parent().parent().attr("id"));

                    let userJSON = localStorage.getItem(user_id);
                    let userOBJ = JSON.parse(userJSON);

                    userOBJ.deletedTasks++;

                    localStorage.setItem(user_id,JSON.stringify(userOBJ));

                    
                })


                $("#grid_view").on("click",function(){

                    let user_where = $(".active").attr("id");



                    if(user_where=="show_all"){
                        changeToGrid("all_tasks_in");
                    }
                    else if(user_where=="show_not_started"){
                        changeToGrid("not_started_tasks");
                    }
                    else if(user_where=="show_pending"){
                        changeToGrid("pending_tasks")
                    }
                    else if(user_where=="show_completed"){
                        changeToGrid("completed_tasks")
                    }
                    
                       
                })
                function changeToGrid(element){
                    $("#"+element).css({
                        "display":"grid",
                        "grid-template-columns":"1fr 1fr",
                        "grid-template-rows":"1fr 1fr 1fr 1fr",
                        
                    })
                    $(".show_all_task_content").fadeOut();
                }
                $("#flex_view").on("click",function(){
                    let user_where = $(".active").attr("id");
                    if(user_where=="show_all"){
                        changeToFlex("all_tasks_in");
                    }
                    else if(user_where=="show_not_started"){
                        changeToFlex("not_started_tasks");
                    }
                    else if(user_where=="show_pending"){
                        changeToFlex("pending_tasks")
                    }
                    else if(user_where=="show_completed"){
                        changeToFlex("completed_tasks")
                    }
                })

                function changeToFlex(element){

                    
                    $("#"+element).css({
                        "height": "90%",
                        "display": "flex",
                        "flex-direction": "column",
                        "justify-content": "space-around",
                    })
                    $(".show_all_task_content").fadeIn();
                }





                /* STATS */

                $("#stats").on("dblclick","span",function(){
                    get_stats_values()
                    if($(this).text().trim()==="arrow_left"){
                        $(this).text("arrow_right");

                        anime({
                            targets:"#stats",
                            right:0
                        })
                        anime({
                            targets:".stat",
                            delay:1000,
                            duration:400,
                            easing:"linear",
                            fontSize:"3rem"
                        })
                    }
                    else if($(this).text().trim()==="arrow_right"){
                        $(this).text("arrow_left");
                        anime({
                            targets:"#stats",
                            right:-230
                        })
                        anime({
                            targets:".stat",
                            delay:1000,
                            fontSize:"1rem"
                        })
                    }
                })

               

                function get_stats_values(){
                    
                    let userJSON = localStorage.getItem(user_id);
                    let userOBJ = JSON.parse(userJSON);
                    
                    let all_tasks = userOBJ.all_tasks;
                    $(".res_total_created").text( ()=>{

                            return all_tasks.length
                    })

                    $(".res_total_not_started").text( ()=>{
                        let val = 0;

                        all_tasks.forEach (task=>{
                            if(task.state==="not_started"){
                                val++;
                            }
                        })
                        return val;
                    })

                    $(".res_total_pending").text( ()=>{
                        let val = 0; 
                        all_tasks.forEach (task=>{
                            if(task.state==="started"){
                                val++;
                            }
                        })
                        return val;
                    })
                    $(".res_total_completed").text( ()=>{
                        let val = 0; 
                        all_tasks.forEach (task=>{
                            if(task.state==="completed"){
                                val++;
                            }
                        })
                        return val;
                    })

                    $(".res_total_deleted").text ( ()=>{
                        

                        return userOBJ.deletedTasks;
                        
                    })
                    $(".res_total_expired").text( ()=>{

                        let val = 0; 
                        all_tasks.forEach(task=>{
                            console.log(task.state==="expired")
                            if(task.state==="expired"){
                                val++;
                            }
                            
                            
                        })
                        return val;
                    })

                    $(".perc_completed").text(()=>{

                        let total = all_tasks.length;
                        let val_comp = 0;

                        all_tasks.forEach(task=>{
                            if(task.state=="completed"){
                                val_comp++;
                            }

                        })
                        return `${val_comp} / ${total}`
                    })
                    
                }
                $("#all_tasks").on("click",function(){
                    anime({
                        targets:"#stats",
                        right:-230
                    })
                    $("#stats span").text("arrow_left");
                })

               console.log(localStorage.getItem(user_id).all_tasks)

                /* TOOLTIP */
               
               
                $("#idd").on("mouseenter",function(e){
                    $("#tooltip").text("Log Out");
                    
                    $("#tooltip").show();
                    let mX = e.clientX;
                    let mY = e.clientY;
                
                    
                    $("#tooltip").css({
                        left: mX-100+"px",
                        top: mY+30+"px",
                        display:"block",
                    })

                    $(this).on("mouseout",function(){
                        $("#tooltip").css("display","none")
                    })

                })

                $("#button_container").on("mouseenter",function(e){
                    $("#tooltip").text("Create Task");
                    $("#tooltip").show();
                    let mX = e.clientX;
                    let mY = e.clientY;

                    console.log(mX,mY)
                    
                    $("#tooltip").css({
                        left: mX+20+"px",
                        top: mY+20+"px",
                        display:"block",
                    })

                    $(this).on("mouseout",function(){
                        $("#tooltip").css("display","none")
                    })
                   
                })
                $("#stats").on("mouseenter",function(e){
                    $("#tooltip").text("Show Stats")
                    $("#tooltip").show();
                    let mX = e.clientX;
                    let mY = e.clientY;

                    console.log(mX,mY)
                    
                    $("#tooltip").css({
                        left: mX-150+"px",
                        top: mY+20+"px",
                        display:"block",
                    })

                    $(this).on("mouseout",function(){
                        $("#tooltip").css("display","none")
                    })
                   
                })
















            /* FUNCTION TO OPEN AND CLOSE THE TASK CREATION INTERFACE */

            function open_hide_TASK_INTERFACE(){



                if($("#create_task").css("display")==="none"){
                    $("#create_task").css({
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                })
                $("#add_btn_span").text("check_indeterminate_small")
                let tg = $("#add_btn_span")[0];

                    let tm = anime.timeline({
                        targets:tg,
                        duration:2000
                    })
                        tm.add({
                            rotate:360
                        })
                }
                else{
                    $("#create_task").css({
                    display: "none",
                    flexWrap: "",
                    justifyContent: "",
                })
                    
                    $("#add_btn_span").text("add_circle")
                    
                }
                
            }
                $("#button_container button").on("click",open_hide_TASK_INTERFACE)

            /* Hide and Show TASKS (ALL OF THEM) */


            function collapseTASK(id){
                let taskID = "#"+id;
                $task = $(taskID);
            $taskID = ($(taskID).attr("id"))

            /*  console.log($taskID) */
                
                $("#"+id).css({

                        "height":"50px",
                        "justifyContent":"space-between"

                        })
                        $task.find(".p0").css({
                        "flexDirection":"row",
                        "width":"15%"
                        });
                        $task.find(".p1 p:eq(1), .p1 ul").hide();
                        $task.find(".p3").hide();
                        $task.find(".p2").css({
                        "width":"10%"
                        })
                        $task.find(".p2 span").css({
                        fontSize:"2rem"
                        })
            }

            function deployTASK(id){
                let taskID = "#"+id;
                $task = $(taskID);
            $taskID = ($(taskID).attr("id"))
                $("#"+id).css({
                    height:"100px",
                })
                $task.find(".p0").css({
                    flexDirection:"column",
                    width:"5%",
                })
                $task.find(".p1 p:eq(1), .p1 ul").fadeIn();
                        $task.find(".p3").fadeIn();
                        $task.find(".p2").css({
                        "width":"20%"
                        })
                        $task.find(".p2 span").css({
                        fontSize:"5rem",
                        })
            }

            /* LOGIC TO OPEN AND CLOSE EACH TASK */
            $(document).on("click",".icon_to_collapse_deploy",function(e){
            
            
                let icon = e.target;
                let icon_text= e.target.textContent.trim();
                let taskID= $(e.target).parent().parent().attr("id");
                

                if(icon_text==="collapse_all"){
                        icon.textContent="unfold_more"
                collapseTASK(taskID);
                }

                else if(icon_text==="unfold_more"){
                        icon.textContent="collapse_all"
                deployTASK(taskID)
                }

                
            })

            /* COLLAPSE ALL THE TASKS */

            function collapseALL_tasks(){
                $("#all_tasks_in, #not_started_tasks, #pending_tasks, #completed_tasks").css({
                    display:"none",
                    overflow:"hidden",
                    
                })
            }
            function deployALL_tasks(){
                    $("#all_tasks_in, #not_started_tasks, #pending_tasks, #completed_tasks").css({
                        "height":"auto",
                        "display":"block"
                        
                    })
            }

            $("#tasks_positioning").on("click",".collapse_show",function(e){

                if(e.target.textContent.trim()==="collapse_all"){
                    e.target.textContent="unfold_more",
                    collapseALL_tasks();
                }else if(e.target.textContent.trim()==="unfold_more"){
                        e.target.textContent="collapse_all",
                        deployALL_tasks();
                }
                
            
            })

            

            
                /* Instead of adding more logic. When task CONTAIN is empty, the button that appears triggers the real button to open the creation interface */
                $(document).on("click","#is_empty button",function(){

                    $("#button_container button").click();
                    
                })


































/* ANIMATIONS AREA ANIMATIONS AREA ANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS AREA 
ANIMATIONS AREA ANIMATIONS AREA ANIMATIONS AREA ANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS 
ANIMATIONS AREA ANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS AREA ANIMATIONS AREAANIMATIONS AREAANIMATIONS AREAANIMATIONS */


/* Animation 1: Animates filters on first entry */
let ms = document.querySelectorAll(".ms");

function animate_Boxes(){

if(first_entrance){
let tm1 = anime.timeline({

    duration:200,
    easing:"linear",

    })

    ms.forEach( (the_target)=>{
        tm1.add({
            targets:the_target,
            borderWidth: "2px",
            borderColor: "#ff0052"
        })
        tm1.add({
            delay:100,
            targets:the_target,
            borderWidth: "2px",
            borderColor: "#1c1c1c",
        })
    })
    first_entrance=false;
}
}

$("#menu_handler").on("click",animate_Boxes)


/* Animation 2:  */

function create_task_first_entry(){
let headers = document.querySelectorAll(".headers");
let tm2 = anime.timeline({
duration:200,
easing:"linear"
})

headers.forEach( (the_target)=>{

tm2.add({
    targets:the_target,
    borderWidth:"2px",
    borderColor: "#ff0052"
})
tm2.add({
    targets:the_target,
    borderWidth:"2px",
    borderColor: "#1c1c1c"
})
})
}
$("button").on("click",create_task_first_entry)


/* Animation 3: Letters of DISCIPLINE ANIMATED */

let logo_text = document.querySelector("#logo p");
logo_text.innerHTML = logo_text.textContent.replace(/\w/g, "<span>$&</span>")

anime({
    targets:"#logo img",
    scale:0
})
let tm3 = anime.timeline({

targets: "#logo p span",
duration:200,
easing:"linear",
delay:anime.stagger(100)

})

tm3.add({
    translateY:-100,
   
})
tm3.add({
    translateY:0
})
tm3.add({
    marginLeft:10
})
tm3.add({
    marginLeft:5
})
tm3.add({
    marginLeft:15,
    complete:function(){
        anime({
            targets:"#logo img",
            scale:1,
        })

        let after_elements = document.querySelectorAll(".after_entry");

        anime({
            targets:after_elements,
            duration:300,
            delay:anime.stagger(300),
            opacity:1,
            complete:function(){

                anime({
                    targets:"span.after_entry",
                    duration:2000,
                    color:[{value:"#ff0052"},{value:"rgb(221,221,221)"}],
                    scale:[{value:2},{value:1}],
                    delay:1000,

                    
                })
            }


        })
    }


})



     /* HELPERS */
    function on_hover_helpers(value){

        
        if(value==="IMPORTANCE"){
            value="flag"
        }
        if(value=="TYPE"){
            value="task_type";
            
        }

        value = value.toLowerCase();
        
        $(document).find("."+value.toLowerCase()).css("background","#1c1c1c");

        

        
        
       
    }
    

    $("#helpers p").on("mouseover",function(e){
        
        on_hover_helpers($(e.target).text());

        
        let value = $(e.target).text();

        
        if(value=="IMPORTANCE"){
            value="flag"
        }
        if(value=="TYPE"){
            value="task_type";
        }
        
            value = value.toLowerCase();

           

        $("#helpers p").on("mouseleave",function(){
            let all = $("."+value).toArray();

                all.forEach(tit=>{
                    $(tit).css("background","transparent")
                })
        })
       
    })

   $("#button_container").on("click","button",function(){

    if($(this).find("span").text().trim()==="add_circle"){

        $("#main_content").css("opacity","1")
    }else{
        $("#main_content").css("opacity","0")
    }
   })
   $("#d_add_task, #d_cancel").on("click",function(){
    $("#main_content").css("opacity","1");
    $("#button_container button span").text("add_circle")
   })
    
        }  /*  END OF RUN DASHBOARD*/






           
            
    
         
    
   
})