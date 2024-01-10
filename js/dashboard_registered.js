
/* Este es el archivo JS principal. Gestiona toda la lógica de la aplicación cuando el usuario inicia la sesión */
$(()=>{
    

    
    $("#show_by_date").hide();

    let user_id = new URLSearchParams(window.location.search);
        user_id = user_id.get("id");

        
        
       
    
    /* END USER SESSION */


    async function logout(){
        let requirement = new FormData();
            requirement.append("action","logout");
        let resp = await fetch("../php/logout.php",{
            method:"POST",
            body: requirement
        });

        let data = await resp.json();

        return data;

    }

    /* from here to everywhere */
    async function fetch_subtasks(task_id){
    
        let task_id_and_user_id = new FormData();
        
        task_id_and_user_id.append("task_id",task_id)
        task_id_and_user_id.append("id",user_id);


            let response = await fetch("../php/task_generator.php",{
                method:"POST",
                body: task_id_and_user_id
            })

            let data = await response.json();

            
            return data;
    }
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

    /* GETTING USER DATA */


    /* SAVE TITLE */
    let title="";
    $("#d_title").on("input",function(){
        
        if(this.value.length>5){
            this.style.borderBottom="2px dashed #4c7b4c"
        }else{
            this.style.borderBottom="2px dashed transparent"
        }
        title = $("#d_title").val();
    })

    /* SAVE DESCRIPTION */
    let description="";
    $("#d_description").on("input",function(){
        description=$("#d_description").val();
        if(this.value.length>10){
            this.style.borderBottom="2px dashed #4c7b4c"
        }else{
            this.style.borderBottom="2px dashed transparent"
        }
        
    })

    
    /* SAVE SUBTASKS ARRAY */
    let array_subtasks=[];

        function save_subtasks(){
            array_subtasks=[];
            let subtasks_group = document.querySelectorAll(".d_subtask");

                subtasks_group.forEach(subt=>{
                    if(subt.value.length>0){
                        array_subtasks.push(subt.value);
                    
                    }
                    
                })

        }
    
            let d_sbtasks = document.querySelectorAll(".d_subtask");
                d_sbtasks.forEach(s=>{
                    s.addEventListener("input",()=>{
                        save_subtasks();
                        
                    })
                })



    /* SAVE HASHTAGS ARRAY */
    let array_hashtags = [];


    function save_hashtags(){

        array_hashtags=[];

        let hashtags_group = document.querySelectorAll("#d_hashtags input");

        hashtags_group.forEach(hash=>{
            if(hash.value.length>0){
                array_hashtags.push(hash.value);

            
            }
            
        })
    }

    let d_hashtags = document.querySelectorAll("#d_hashtags input")
        d_hashtags.forEach(hs=>{
            hs.addEventListener("change",save_hashtags)
        })
    
    
    /* SAVE TASK TYPE */
        task_type="";

        /* If user focus INPUT, type_value is empty again */
            $("#d_types li input").on("focus",function(e){
            task_type=$(this).val();
        
            /* We change type_value value on INPUT */
            $(this).on("input",function(){
                task_type = $(e.target).val();
                
            })
        
})

/* If user clicks any LI, we set type_value with its ID */
    $("#d_types").on("click","li",function(e){
        let tm = anime.timeline({
            targets:this,
            duration:200
        })
            tm.add({
                translateY:-10,
                scale:0.8
            })
            tm.add({
                translateY:0,
                scale:1
            })
        
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


    /* SAVE FLAG  */
    let flag="";
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
        let tm = anime.timeline({
            targets:this,
            duration:200
        })
            tm.add({
                translateY:-10,
                scale:0.8
            })
            tm.add({
                translateY:0,
                scale:1
            })
        getDataFlags(e.target)
    })


    /* SAVE DATE  */
    let date="";
    function getDataDate(){

        $("#d_date").on("change",function(e){
            date = $(this).val();
                
        })
    }
            
   
    getDataDate();

    /* HELPER FUNCTION ->  MUST BE DELETED */
    function showAllValues(){
        console.log("----------------------------------yourdata----------------------")
        console.log(title)
        console.log(description)
        console.log(task_type)
        console.log(flag)
        console.log(array_subtasks)
        console.log(array_hashtags)
        console.log(date)
    }

    $("#date").on("dblclick",showAllValues)


    /*  START OF DATA SAVING */
    
    function saveTask(){
        
        let dialog = document.querySelector("#task_inserted");
        async function insert_into_tasks(){

            
                let data_task = new FormData();

                data_task.append("user",user_id);
                data_task.append("title",title);
                data_task.append("description",description);
                data_task.append("task_type",task_type);
                data_task.append("flag",flag);
                data_task.append("date",date);

                let today = new Date();
                    let td_d = today.getDate();
                    let td_m = today.getMonth();
                    let td_y = today.getFullYear();
                    let today_formatt = new Date(td_y,td_m,td_d);
                let taskdate = new Date(date);
                let ts_d = taskdate.getDate();
                    let ts_m = taskdate.getMonth();
                    let ts_y = taskdate.getFullYear();
                    let task_formatt = new Date(ts_y,ts_m,ts_d);
                    /*  today= today.toLocaleDateString()
                    taskdate=taskdate.toLocaleDateString() */

                    console.log(task_formatt<today_formatt)
                if(task_formatt<today_formatt){
                    alert("Expired date!");
                   
                    data_task.append("state","expired");
                        
                    
                }else{
                    data_task.append("state","not_started")
                }
                


                let response = await fetch("../php/insert_task.php",{
                    method:"POST",
                    body:data_task
                })

                let data = await response.json();
                console.log(data)
                return data;
            
        }

        async function insert_into_subtasks(parent_task_id){

            let subtasks_promises = [];


            for(let i=0; i<array_subtasks.length;i++){


                let subtask_data = new FormData();

                    subtask_data.append("task_id",parent_task_id);
                    subtask_data.append("subtask",array_subtasks[i]);
                    subtask_data.append("id",user_id);


                    let response = await fetch("../php/insert_subtasks.php",{
                        method:"POST",
                        body: subtask_data
                    })

                    let data = await response.json();

                    subtasks_promises.push(data);
            }
            return Promise.all(subtasks_promises);
        }
        
        async function insert_into_hashtags(parent_task_id){

            let hashtags_promises = [];

            for(let i=0; i<array_hashtags.length;i++){

                let hashtags_data = new FormData();

                    hashtags_data.append("task_id",parent_task_id);
                    hashtags_data.append("hashtag",array_hashtags[i])
                    hashtags_data.append("user_id",user_id);


                    let response = fetch("../php/insert_hashtags.php",{
                        method:"POST",
                        body: hashtags_data
                    })

                    let data = (await response).json();

                    hashtags_promises.push(data);
            }
            return Promise.all(hashtags_promises);
        }


       if(title.length>5 && description.length>10){
        insert_into_tasks()
        .then(data=>{
            
            let parent_task = data.task_id;
            
            let dialog = document.querySelector("#task_inserted");
                    $(dialog).find("div").empty();
                    $(dialog).find("div").html(' <i class="fa-solid fa-circle-check"></i>')
                
                dialog.showModal();

                let tm  =anime.timeline({
                    targets: "#task_inserted i",
                    duration:1000
                })
                
                tm.add({
                    scale:1
                })
                tm.add({
                    scale:2
                })
                tm.add({
                    scale:1
                })
                setTimeout(() => {
                    dialog.close();
                    $("#create_task").hide();
                    $("#add_btn_span").text("add_circle");
                }, 2000);
               

                insert_into_subtasks(parent_task)

                    .then(data=>{
                        data.forEach(d=>{
                            
                        })
                    })

                insert_into_hashtags(parent_task)
                    .then(data=>{
                        data.forEach(d=>{
                            
                        })
                    })
                    get_all_tasks2()
                    .then(data=>{
                        
                        $("#all_tasks_in").empty()
                        console.table(data)
                        data.forEach( row=>{
                            
                           setTimeout(() => {
                            let arr_subtasks=[];
                            fetch_subtasks(row.task_id)
                            
                            .then(data=>{
                                data.forEach(subtask=>{
                                    
                                    arr_subtasks.push(subtask.subtask_name)
                                })
                
                                let task = task_structure(row.task_id,row.task_title,row.task_description,row.task_flag,row.task_type,row.task_limit_date,arr_subtasks,row.task_state)
                            
                                $("#all_tasks_in").append(task)
            
            
                                let id_of_task = row.task_id;
                                check_state(row.task_state,id_of_task)
                
                                
                               
                            })                  


                             
                           }, 2000);
                            
                        })
                    })
        })
       }else{
        $(dialog).find("div").empty();
        $(dialog).find("div").html(' <i class="fa-solid fa-triangle-exclamation"></i>')
        
        let element = document.createElement("p");
        
        let message = "Title : Mininum of 5 characters. Description: Minimum of 10 characters";
        element.append(message)
        let x = dialog.querySelector("div").append(element);
        dialog.showModal();

        setTimeout(() => {
            dialog.close();
        }, 3000);
       

        dialog.showModal();
       }
    }

    


    /* Event that triggers TASK creation */
    let button_for_creating_task = document.querySelector("#d_add_task");
    
        button_for_creating_task.addEventListener("click",saveTask);



    /* END OF DATA SAVING */


   





 


    /* Inherited functions from the principal  */

    /* FUNCTION TO OPEN THE TASK GENERATOR INTERFACE */
    





/* Retrieving data from database to create TASKS */
function task_structure(id,title,desc,flag,task_type,date,array_subtasks,state){
                
    let datec = new Date(date);
    
    datec = datec.toDateString();


  
    
    let subtasks_li = "";

        subtasks_li+= `<p>${desc}</p>`;

            for(let i=0; i<array_subtasks.length;i++){

                subtasks_li+=`<li>${array_subtasks[i]}</li>`
            }
    
        let checked;

            if(state==="pending"){
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


    let is_selected;

        if(state=="completed"){
            is_selected="checked";

        }else{
            is_selected="";
        }
    

        /* REAL STRUCTURE */
    let task = `<div id="${id}" class="task ">
            
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

            <ul class="hideme" hidden>
                <h1>Description and Subtasks</h1>
                ${subtasks_li}
                
            </ul>
            <div class="date_and_done">
                <p class=dd_state>State: ${state}</p>
                <p>${datec}</p>
                <p>Is Done</p>
                <input class="task_done" ${is_selected} type="checkbox">
            </div>






            </div>`
            
            $(document).find(".hideme").hide();
            

            return task;
}





async function get_all_tasks2(){

    let data_all_ = new FormData();
        data_all_.append("type","all_tasks");
        data_all_.append("id",user_id);

    let response = await fetch("../php/task_generator.php",{

        method:"POST",
        body: data_all_
    })
    let data = await response.json();

    return data;

}


/* METHOD FOR CREATING TASKS -> I pass the data returned from server, allows me to do not repeat the code  */
function fetch_and_create_task(data){

    data.forEach( row=>{
                    
        

        let arr_subtasks = [];
                fetch_subtasks(row.task_id)
    
                .then(data=>{
                    data.forEach(subtask=>{
                        
                        arr_subtasks.push(subtask.subtask_name)
                    })
    
                    let task = task_structure(row.task_id,row.task_title,row.task_description,row.task_flag,row.task_type,row.task_limit_date,arr_subtasks,row.task_state)
                
                    $("#all_tasks_in").append(task)


                    let id_of_task = row.task_id;
                    check_state(row.task_state,id_of_task)
    
                    
                   
                })                  


        
        
        
        
})

}


  /* GET ALL TASKS -> I HAVE TO ADD THE SUBTASKS */
    async function get_all_tasks(callback){

        let data_all_ = new FormData();
            data_all_.append("type","all_tasks");
            data_all_.append("id",user_id);
    
          fetch("../php/task_generator.php",{
    
            method:"POST",
            body: data_all_
        })
            .then(response=>response.json())
            .then(data=>{
                

                fetch_and_create_task(data)


                if(typeof callback ==="function"){
                    callback()
                }


        })
        
    
        
    
    }
    

  
    get_all_tasks(()=>{

        $(".task").css("position","inline");

        /* WHEN USER CLICKS RADIO BUTTON ===== START TASK ==== PENDING */
        $(document).on("click",".complete_box .completed",function(e){

        
                    task_id= $(e.target).closest(".task").attr("id");
                    console.log(task_id)

                    let formD = new FormData();
                        formD.append("update_state",task_id);
                        formD.append("newstate","pending");

                    fetch("../php/update_states.php",{
                        method:"POST",
                        body:formD
                    })
                    .then(response=>response.json())
                    .then(data=>{

                        refresh_page("all_tasks");

                    })
                
            })

            /* WHEN USER CLICKS CHECKBOX BUTTON ===== END TASK ===== COMPLETED */
            $(document).on("click",".task_done",function(e){

        
                task_id= $(e.target).closest(".task").attr("id");
                console.log(task_id)

                let formD = new FormData();
                    formD.append("update_state",task_id);
                    formD.append("newstate","completed");

                fetch("../php/update_states.php",{
                    method:"POST",
                    body:formD
                })
                .then(response=>response.json())
                .then(data=>{
                        console.log(data.id)
                        
                    refresh_page("all_tasks");  
            })

            /* WHEN USER CLICKS DELETE BUTTON ==== DELETE FROM DATABASE ===== */
           
        })

        $(document).on("click",".remove_task",function(e){

            let dialg = document.querySelector("#confirm_delete");

                dialg.showModal();

                $("#confirm").on("click",function(){

                    task_id= $(e.target).closest(".task").attr("id");
                    console.log(task_id)
        
                    let formD = new FormData();
                        formD.append("task_to_delete",task_id);
        
                    fetch("../php/delete_task.php",{
                        method:"POST",
                        body:formD
                    })
                    .then(response=>response.json())
                    .then(data=>{
        
                        console.log(data.message);
        
                        let dialog = document.querySelector("#dialog_deleted_task");
        
                            dialog.showModal();
        
        
                            let tm  =anime.timeline({
                                targets: "#dialog_deleted_task i",
                                duration:1000
                            })
                            
                            
                            tm.add({
                                scale:2,
                                
                            })
                            tm.add({
                                scale:1
                            })
                            setTimeout(() => {
                                dialog.close();
                                $("#all_tasks_in").empty();
        
                                refresh_page("all_tasks")
                            }, 1000);
        
        
        
        
        
                        
        
                    })
                    
                    dialg.close();

                })
                $("#cancel").on("click",function(){
                    dialg.close();
                })
           
    
           
        })
    })
    
    function refresh_page(type){

        if(type==="all_tasks"){

            $(document).find("#all_tasks_in").empty();

            let data_all_ = new FormData();
            data_all_.append("type","all_tasks");
            data_all_.append("id",user_id);
            fetch("../php/task_generator.php",{
                method:"POST",
                body:data_all_
            })
            .then(response=>response.json())
            .then(data=>{

                fetch_and_create_task(data)
                
                
            })
        }

    }
        
   
    











/* FUNCTIONS FOR GETTING FILTERING DATA */


    async function filter_type(type_of_filter_input){

        if(type_of_filter_input==="all"){
            let type_of_filter = new FormData();
            type_of_filter.append("get_all_tasks",true);
            type_of_filter.append("id",user_id)

        

        let response= await fetch("../php/get_filtered_data.php",{
            
            method:"POST",
            body: type_of_filter
        })

        let data = await response.json();

        return data;

        }else{
            let type_of_filter = new FormData();
            type_of_filter.append("type",type_of_filter_input);
            type_of_filter.append("id",user_id);

        

        let response= await fetch("../php/get_filtered_data.php",{
            
            method:"POST",
            body: type_of_filter
        })

        let data = await response.json();

        return data;
        }
        



        }


        /* DATE  LOGIC  */
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

                
                let formData = new FormData();
                    formData.append("months","get_all")
                    formData.append("id_of_the_user", user_id);
                fetch("../php/get_filtered_data.php",{
                    method:"POST",
                    body: formData
                    
                })
                .then(response=>response.json())
                .then(data=>{

                    data.forEach(task=>{
                        console.log((task.task_limit_date))
                        

                        let d = new Date(task.task_limit_date);

                        console.log(d)
                        let month_ = d.getMonth()+1;
                        
                        let day_ = d.getDate();
    
                        
                        if(month_==month){
    
                            if(task.task_state==="not_started"){
                                $(".d"+day_).append("<div class='mini_taskNON'></div>")
                                
                            }
                            else if(task.task_state==="pending"){
                                $(".d"+day_).append("<div class='mini_taskSTART'></div>")
                            }else if(task.task_state==="completed"){
                                $(".d"+day_).append("<div class='mini_taskCOM'></div>")
                            }
                            
                        }
    

                    })
                })
                

               
            }

            function add_tasks_of_this_month(){
                let all_tasks_of_month = "";

                let formData = new FormData();
                    formData.append("months","get_all");
                    formData.append("id_of_the_user",user_id);
               
                fetch("../php/get_filtered_data.php",{
                    method:"POST",
                    body: formData
                    
                })
                .then(response=>response.json())
                .then(data=>{

                    data.forEach(task=>{
                        let d = new Date(task.task_limit_date);
                            let month_ = d.getMonth()+1;
                            let day_ = d.getDate();
                        console.log(month_)
                        console.log(month)
                        if(month_==month){
                        
                            if(task.task_state==="not_started"){
                                all_tasks_of_month+= `<div class="mt_titleNON"> *${task.task_title} ( day: ${day_})</div>`
                            }
                            else if(task.task_state==="pending"){
                                all_tasks_of_month+= `<div class="mt_titleSTART"> *${task.task_title} ( day: ${day_})</div>`
                            }
                            else if(task.task_state==="completed"){
                                all_tasks_of_month+= `<div class="mt_titleCOM"> *${task.task_title} ( day: ${day_})</div>`
                            }else if(task.task_state==="expired"){
                                all_tasks_of_month+=`<div class="mt_titleEXP"> *${task.task_title} ( day: ${day_})</div>`
                            }
                           
                            
                            
                        }
                        $("#titles_here").html(all_tasks_of_month);
                        $("#titles_here").fadeIn();

                    })
                })

               

                   
            
                
        }

            createVirtualMonth(theMonthHas);
            addTasks_on_days()
            add_tasks_of_this_month();
        }

        $(document).on("click","#show_by_date div.typemonth",function(){

            months($(this).attr("id"));

            $("#show_by_date div.typemonth").css("background","transparent");
            $(this).css("background","rgb(78 84 71)");
        })
        
    

/* logic for filtering by day */
function get_today_tasks(){
    $("#today_tasks").empty();

    let formData = new FormData();
        formData.append("months","get_all")
        formData.append("id_of_the_user",user_id);

     fetch("../php/get_filtered_data.php",{
        method:"POST",
        body:formData
    })
    .then(response=>response.json())
    .then(data=>{
        data.forEach(task=>{

             /* Today */
        let date = new Date();
        
       

        /* Task date  */
        let date2 = new Date(task.task_limit_date)
            
          
                console.log(date2.toDateString()==date.toDateString());
                

        if(date2.toDateString()===date.toDateString()){
            let new_task = task_structure(task.task_id,task.task_title,task.task_description,task.task_flag,task.task_type,task.task_limit_date,[],task.task_state);
            
            $(document).find("#today_tasks").append(new_task) 
            $(".task ul").hide();
            $(".task").css("border","1px solid purple");
            
            let tm = anime.timeline({
                targets:".task",
                loop:true,
                duration:2000,
                easing:"linear",
                direction:"alternate",
                

            })
           
            

            
            tm.add({
                boxShadow: "0px 1px 17px 0px rgba(240,14,240,0.75)",
                
                
            })

        }

        })
    })
    
    
    
   
}


/* ADD STYLES FOR THE DIFFERENT TASK STATES */

function check_state(state,id){
    if(state==="not_started"){
        $("#"+id).css("border","1px dashed #A2CFE2")
    }
    else if(state==="pending"){
        
        $("#"+id).css("border","1px solid #F8E71C")
    }
    else if(state==="completed"){
            
        $("#"+id).css("border","1px solid #96D38C")
    }
    else if(state==="expired"){
        
        $("#"+id).css("border","1px solid #ff0052")
    }
}

/* FILTERING */
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
        $("#search").val("");
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
        
        filter_type("not_started")
        .then(data=>{

            /* We set empty the box for not overlapping elements */
            $("#not_started_tasks").empty();

            



            data.forEach( row=>{
                let arr_subtasks = [];
                fetch_subtasks(row.task_id)
    
                .then(data=>{
                    data.forEach(subtask=>{
                        
                        arr_subtasks.push(subtask.subtask_name)
                    })
    
                    let task = task_structure(row.task_id,row.task_title,row.task_description,row.task_flag,row.task_type,row.task_limit_date,arr_subtasks,row.task_state)
                
                    $("#not_started_tasks").append(task)


                    let id_of_task = row.task_id;
                    check_state(row.task_state,id_of_task)
    
                    
                   
                })                  
                 /* id, title,desc,flag,task_type,date,array_subtasks, state */
                 
            })
            
        })
        .catch(error=>{
            console.log(error);
        })

        show_this_section("#not_started_tasks")

        isNowActive("#show_not_started")
        isNowInactive(["#show_all", "#show_pending", "#show_completed", "#show_date","#show_today", "#show_expired"])
        

    }
    else if(filter==="show_all"){
        $("#search").val("");
        setHeaderText("ALL TASKS")

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

        filter_type("all")
        .then(data=>{
                
            /* We set empty the box for not overlapping elements */
            $("#all_tasks_in").empty();

            



            data.forEach( row=>{
                
                let arr_subtasks = [];
                fetch_subtasks(row.task_id)
    
                .then(data=>{
                    data.forEach(subtask=>{
                        
                        arr_subtasks.push(subtask.subtask_name)
                    })
    
                    let task = task_structure(row.task_id,row.task_title,row.task_description,row.task_flag,row.task_type,row.task_limit_date,arr_subtasks,row.task_state)
                
                    $("#all_tasks_in").append(task)

                    

                   
                    let id_of_task = row.task_id;
                    check_state(row.task_state,id_of_task)
                    
                  
    
                    
                   
                })                  
                 /* id, title,desc,flag,task_type,date,array_subtasks, state */
                 
            })
            
        })
        .catch(error=>{
            console.log(error);
        })
        

        show_this_section("#all_tasks_in");
        
        isNowActive("#show_all");
        
        isNowInactive(["#show_not_started", "#show_pending", "#show_completed", "#show_date","#show_today", "#show_expired"])
    }

    else if(filter==="show_pending"){
        $("#search").val("");
        setHeaderText("STARTED TASKS (NOT ENDED)")
        
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

        filter_type("pending")
        .then(data=>{

            /* We set empty the box for not overlapping elements */
            $("#pending_tasks").empty();

            



            data.forEach( row=>{
                let arr_subtasks = [];
                fetch_subtasks(row.task_id)
    
                .then(data=>{
                    data.forEach(subtask=>{
                        
                        arr_subtasks.push(subtask.subtask_name)
                    })
    
                    let task = task_structure(row.task_id,row.task_title,row.task_description,row.task_flag,row.task_type,row.task_limit_date,arr_subtasks,row.task_state)
                
                    $("#pending_tasks").append(task)
    
                    
                    let id_of_task = row.task_id;
                    check_state(row.task_state,id_of_task)
                })                  
                 /* id, title,desc,flag,task_type,date,array_subtasks, state */
                 
            })
            
        })
        .catch(error=>{
            console.log(error);
        })
        

        show_this_section("#pending_tasks")
        
       isNowActive("#show_pending")
       isNowInactive(["#show_not_started", "#show_all", "#show_completed", "#show_date","#show_today", "#show_expired"])
    }
    else if(filter==="show_completed"){
        $("#search").val("");
        setHeaderText("COMPLETED TASKS")
       
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


        filter_type("completed")
        .then(data=>{

            /* We set empty the box for not overlapping elements */
            $("#completed_tasks").empty();

            



            data.forEach( row=>{
                let arr_subtasks = [];
                fetch_subtasks(row.task_id)
    
                .then(data=>{
                    data.forEach(subtask=>{
                        
                        arr_subtasks.push(subtask.subtask_name)
                    })
    
                    let task = task_structure(row.task_id,row.task_title,row.task_description,row.task_flag,row.task_type,row.task_limit_date,arr_subtasks,row.task_state)
                
                    $("#completed_tasks").append(task)
    
                    let id_of_task = row.task_id;
                    check_state(row.task_state,id_of_task)
                   
                })                  
                 /* id, title,desc,flag,task_type,date,array_subtasks, state */
                 
            })
            
        })
        .catch(error=>{
            console.log(error);
        })
        

        show_this_section("#completed_tasks");
        
        isNowActive("#show_completed");
        $("#show_not_started, #show_all, #show_pending, #show_filtered").removeClass("active")
        isNowInactive(["#show_not_started", "#show_all", "#show_pending", "#show_date","#show_today", "#show_expired"])
    }
    else if(filter==="show_date" || filter==="Mostrar por fecha"){
        $("#search").val("");
        $("#helpers").hide();
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
        isNowInactive(["#show_all","#show_not_started","#show_completed","#show_pending","#show_today", "#show_expired"])
    }
    else if(filter==="show_expired"){
        $("#search").val("");
        setHeaderText("EXPIRED TASKS")
        
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

        filter_type("expired")
        .then(data=>{

            /* We set empty the box for not overlapping elements */
            $("#not_started_tasks").empty();

            



            data.forEach( row=>{
                let arr_subtasks = [];
                fetch_subtasks(row.task_id)
    
                .then(data=>{
                    data.forEach(subtask=>{
                        
                        arr_subtasks.push(subtask.subtask_name)
                    })
    
                    let task = task_structure(row.task_id,row.task_title,row.task_description,row.task_flag,row.task_type,row.task_limit_date,arr_subtasks,row.task_state)
                
                    $("#expired_tasks").append(task)
    
                    let id_of_task = row.task_id;
                    check_state(row.task_state,id_of_task)
                   
                })                  
                 /* id, title,desc,flag,task_type,date,array_subtasks, state */
                 
            })
            
        })
        .catch(error=>{
            console.log(error);
        })
        

        show_this_section("#expired_tasks");
        
        isNowActive("#show_expired");
        
        isNowInactive(["#show_not_started", "#show_pending", "#show_completed", "#show_date", "#show_all"])

    } else if(filter==="show_today"){
        $("#search").val("");
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
    
})
    




/* SPECIFIC FILTERING */






/* STATS */

$("#stats").on("dblclick","span",function(){
    let d_send = new FormData();
        d_send.append("id",user_id);
    fetch("../php/stats.php",{
        method:"POST",
        
         body:d_send
    })
    .then(response=>response.json())
    .then(data=>{

       
        $(".res_total_created").text(data.all);
        $(".res_total_not_started").text(data.not_started);
        $(".res_total_pending").text(data.pending);
        $(".res_total_completed").text(data.completed);
        $(".res_total_expired").text(data.expired)
        $(".perc_completed").text(data.completed+"/"+data.all);


    })
    /* get_stats_values() */
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
             



/* FILTERING (specific) */

let filter_selected="";

function selectFilterType(target){

    filter_selected= $(target).val();

    $("#type_of_filter p").text("Filtering by: "+ $(target).val())

    anime({
        targets: "#type_of_filter p",
        duration:1000,
        translateY:[50,0]
    })

            if(filter_selected==="IMPORTANCE"){

                let elem ="";

                    elem +="FILTERING BY: IMPORTANCE"
                    elem += "<div> 0 - 3 - 6 - 9 - 10</div>"
                $("#type_of_filter p").html(elem);
            }

            /* RADIO BUTTON -> TARGET */
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

    selectFilterType($(e.target));

    $("#specific_filters").empty();
    

   
})

function specificFilters(){
                $("#all_tasks_in ,#not_started_tasks, #pending_tasks, #completed_tasks, #show_by_date, #today_tasks, #expired_tasks").empty()
    $("#all_tasks_in ,#not_started_tasks, #pending_tasks, #completed_tasks, #show_by_date, #today_tasks, #expired_tasks").hide()
    
    

    
    
    
}
function noneActive(){
    $(".active").removeClass("active")
}

$("#search").on("input",specificFilters)
$("#search").on("click",noneActive)
$("#search").on("input",function(){
    
    /* If user doesn't write anything or deletes all, all tasks will be shown */
if($("#search").val().trim()===""){
    $("#specific_filters").hide();
    $("#specific_filters").empty();
    get_all_tasks2()
    
    /* When user deletes their input, we fetch again every task from server. When user writes, all tasks are deleted and the filtered ones appear in  */
    .then(data=>{
        data.forEach(task=>{


            let arr_subtasks = [];
            fetch_subtasks(task.task_id)
            .then(data=>{
                data.forEach(subtask=>{
                    
                    arr_subtasks.push(subtask.subtask_name)
                })
    
                let tsk = task_structure(task.task_id,task.task_title,task.task_description,task.task_flag,task.task_type,task.task_limit_date,arr_subtasks,task.task_state)
            
                

                
                $("#all_tasks_in").append(tsk);
                check_state(task.task_state,task.task_id)
                
           
                
               
            
               
            })                  
            
            
            
        })
        
    })
    $("#all_tasks_in").show();
}
else{
    $("#specific_filters").fadeIn();
}


})


function filterBy_use_this_to_fetch(d){

    $("#specific_filters").empty();

    
   
    /* ---------------------- */
    
    fetch("../php/specific_filters.php",{
        method:"POST",
        body: d
    })
    .then(response=>response.json())
    .then(data=>{
        
                                                    /*id,title,desc,flag,task_type,date,array_subtasks, state*/
        data.forEach(task=>{


            let arr_subtasks = [];
            fetch_subtasks(task.task_id)
            .then(data=>{
                data.forEach(subtask=>{
                    
                    arr_subtasks.push(subtask.subtask_name)
                })
    
                let tsk = task_structure(task.task_id,task.task_title,task.task_description,task.task_flag,task.task_type,task.task_limit_date,arr_subtasks,task.task_state)
            
                

                
                $("#specific_filters").append(tsk);
                check_state(task.task_state,task.task_id)
                
           
                
               
            
               
            })                  
            
            
            
        })
        
    })
    /* -.------------------------------------ */
    
}

function filterBy(user_has_written){
    
    let query = user_has_written;

    

    let data = new FormData();
        data.append("user_id",user_id);
        data.append("query",query);

    

    if(filter_selected==""){

   
    }
    else{

        /* SPECIFIC FILTERS -> */
        if(filter_selected=="FAMILY TYPE"){
                data.append("filter","task_type");
                filterBy_use_this_to_fetch(data)
        }

        else if(filter_selected=="IMPORTANCE"){
            data.append("filter","task_flag");
                filterBy_use_this_to_fetch(data)
        }
        else if(filter_selected=="DESCRIPTION"){
            data.append("filter","task_description");
            filterBy_use_this_to_fetch(data)
        }
        
        else if(filter_selected=="TITLE"){
            data.append("filter","task_title");
            filterBy_use_this_to_fetch(data)
        }
        else if(filter_selected=="SUBTASKS"){
            $("#specific_filters").empty();
                /* Completely new function that fetch tasks based on a search of every subtask that user created related to each task */
            
                let d_h = new FormData();
                d_h.append("user_id",user_id);
                d_h.append("filter","subtasks");
                d_h.append("query",query);

            fetch("../php/specific_filters_hash_subs.php",{
                method:"POST",
                body: d_h
            })
            .then(response=>response.json())
            .then(data=>{
                   
                console.log(data)
                
                data.forEach(task=>{
                    let arr_subtasks =[];
                    fetch_subtasks(task.task_id)

                    .then(subtask=>{

                        subtask.forEach(sb=>{

                            arr_subtasks.push(sb.subtask_name)
                        })


                        let tsk = task_structure(task.task_id,task.task_title,task.task_description,task.task_flag,task.task_type,task.task_limit_date,arr_subtasks,task.task_state)
            
                

                
                        $("#specific_filters").append(tsk);
                        check_state(task.task_state,task.task_id)
                    })
                })
            })

                
        }
        else if(filter_selected=="HASHTAG"){
            $("#specific_filters").empty();
            let d_h = new FormData();
                d_h.append("user_id",user_id);
                d_h.append("filter","hashtags");
                d_h.append("query",query);

            fetch("../php/specific_filters_hash_subs.php",{
                method:"POST",
                body: d_h
            })
            .then(response=>response.json())
            .then(data=>{
                   
                console.log(data)
                
                data.forEach(task=>{
                    let arr_subtasks =[];
                    fetch_subtasks(task.task_id)

                    .then(subtask=>{

                        subtask.forEach(sb=>{

                            arr_subtasks.push(sb.subtask_name)
                        })


                        let tsk = task_structure(task.task_id,task.task_title,task.task_description,task.task_flag,task.task_type,task.task_limit_date,arr_subtasks,task.task_state)
            
                

                
                        $("#specific_filters").append(tsk);
                        check_state(task.task_state,task.task_id)
                    })
                })
            })

            
            

                /* completely new function that fetch tasks based on a search of every hashtags that user created related to each task */
        }
    }
  
}

$("#faq").on("mouseover",function(){
    let dialog_faq = document.querySelector("#dialog_faq");
        dialog_faq.show();

        $("#faq").css({
            "background":"#96D38C",
            "color":"black"
        });
       

        $("#faq").on("mouseleave",()=>{
            dialog_faq.close();
            $("#faq").css({
                "background":"black",
                "color":"white"
        });
        })

        
})


/* Language changing */
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



$("#search").on("input",function(e){
    filterBy($(e.target).val())
    
})





function fetchDataForPDF(){
    
    let fd = new FormData();
        fd.append("id",user_id);
    fetch("../php/pdf_generator.php",{
        method:"POST",
        body: fd
    })
    .then(response=>response.json())
    .then(data=>{

        console.log(data[4])
     
           
        /* Get today date */
        function today(){
            let date = new Date();
                let d= date.getDate();
                let m = date.getMonth();
                let y = date.getFullYear();

                date = new Date(y,m,d);
                date = date.toDateString();
                return date;
        }

       
        var props = {
            outputType: jsPDFInvoiceTemplate.OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: "My Tasks",
            orientationLandscape: false,
            compress: true,
            logo: {
                src: "../media/logo1.png",
                type: 'PNG', //optional, when src= data:uri (nodejs case)
                width: 30, //aspect ratio = width/height
                height: 30,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            stamp: {
                inAllPages: true, //by default = false, just in the last page
                src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
                type: 'JPG', //optional, when src= data:uri (nodejs case)
                width: 20, //aspect ratio = width/height
                height: 20,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "DISCIPLINE",
                address: "Spain",
                
                email: "discipline@team.com",
                
                website: "www.discipline.com",
            },
            contact: {
                label: "Invoice issued for:",
                name: `${data[0][0].name} ${data[0][0].last_name}`,
                email: data[0][0].email,
                
            },
            invoice: {
                label: "Your ID #: ",
                num: `${data[0][0].id}`,
                invDate: today(),
                
                headerBorder: false,
                tableBodyBorder: false,
                header: [
                  {
                    title: "ID", 
                   
                  }, 
                  { 
                    title: "Title",
                   
                  }, 
                  { 
                    title: "Description",
                    
                  }, 
                  { title: "Task Type"},
                  { title: "Task Flag"},
                  { title: "Creation Date"},
                  { title: "Task State"}
                ],
                table: data[3].map(task=>([
                    `${task.task_id}`,
                    `${task.task_title}`,
                    `${task.task_description}`,
                    `${task.task_type}`,
                    `${task.task_flag}`,
                    `${task.task_creation_date}`,
                    `${task.task_state}`,
                   
                ])),
                additionalRows: [{
                    col1: 'Total:',
                    col2: '145,250.50',
                    col3: 'ALL',
                    style: {
                        fontSize: 14 //optional, default 12
                    }
                },
                {
                    col1: 'VAT:',
                    col2: '20',
                    col3: '%',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                },
                {
                    col1: 'SubTotal:',
                    col2: '116,199.90',
                    col3: 'ALL',
                    style: {
                        fontSize: 10 //optional, default 12
                    }
                }],
                invDescLabel: "Your current progress",
                invDesc: `Total Tasks: ${data[4]}`,
                
            },
            footer: {
                text: "Team Discipline.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        };

           function generatePDF(){
        var pdfObject = jsPDFInvoiceTemplate.default(props);
        console.log("Object created", pdfObject)
        }

        generatePDF();
        
    })
}






$("#gen_pdf").on("click",function(){
 fetchDataForPDF();

 $(this).css("border","2px solid green")
 
 setTimeout(() => {
    $(this).css("border","2px solid white")
 }, 2000);
})


/* NO SCRIPT HIDE */





    
})






























/* FILTER MENU OPEN AND HIDE */

   /* FUNCTION TO OPEN AND CLOSE FILTERS */
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
            $("#filters").css("width","25%")
    }
}

$("#menu_handler").on("click",menu_open_close);
