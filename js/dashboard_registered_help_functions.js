
/* Este archivo JS nos permite tener funciones de menor importancia agrupadas todas ellas en un mismo archivo 
Así evitamos que el principal (dashboard_registered no se sobrecargue) */

$(()=>{
    
    /* HELPERS */
    function on_hover_helpers(value){

        
        if(value==="IMPORTANCE" || value=="IMPORTANCIA"){
            value="flag"
        }
        if(value=="TYPE" || value=="TIPO"){
            value="task_type";
            
        }
        if(value=="TITULO"){
            value="title"
        }
    
        value = value.toLowerCase();
        
        $(document).find("."+value.toLowerCase()).css({
            "background":"#1c1c1c",
            "border":"1px solid grey"
        });
    
        
       
    }
    $("#helpers p").on("mouseover",function(e){
        
        on_hover_helpers($(e.target).text());
    
        
        let value = $(e.target).text();
    
        
        if(value=="IMPORTANCE" || value=="IMPORTANCIA"){
            value="flag"
        }
        if(value=="TYPE" || value=="TIPO"){
            value="task_type";
        }
        if(value=="TITULO"){
            value="title"
        }
        
        
            value = value.toLowerCase();
    
           
    
        $("#helpers p").on("mouseleave",function(){
            let all = $("."+value).toArray();
    
                all.forEach(tit=>{
                    $(tit).css({
                        "background":"transparent",
                        "border":"1px solid transparent"
                    })
                })
        })
       
    })

    
    /* TASK INTERFACE */
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



/* CLOSE TASK INTERFACE */
    
$("#d_cancel").on("click",function(){
    $("#create_task").fadeOut();
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





$(document).on("click",".task .show_all_task_content",function(){
                let $parent = $(this).closest(".task");

                
                let id= $parent.attr("id");

                let $state = $parent.find("span.show_all_task_content");
                
                /* revisar */
                if($state.text().trim()==="expand_less"){
                    $(this).parent().parent().css({
                        "height":"100px",
                       
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




            /* HIDE AND SHOW ALL THE TASKS */
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





                /* FLEX OR GRID VIEW */

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


                /* Quit helpers */

                $(".hide_help").on("click",()=>{
                    
                    let tm = anime.timeline({
                        targets:".history",
                        duration:400
                    })

                    tm.add({
                        translateY:-20
                    })
                    tm.add({
                        translateX:1000,
                        complete: function(){
                            $(".history").remove();
                        }
                    })
                    
                })
    


                /* CLOSE CONFIGURATION MENU */

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

                    
                    
                    $("#tooltip").css({
                        left: mX-150+"px",
                        top: mY+20+"px",
                        display:"block",
                    })

                    $(this).on("mouseout",function(){
                        $("#tooltip").css("display","none")
                    })
                   
                })


                

               

/*ANIMATIONS */
let logo_text = document.querySelector("#logo p");
logo_text.innerHTML = logo_text.textContent.replace(/\w/g, "<span>$&</span>")



let tm3 = anime.timeline({

targets: "#logo p span",
duration:200,
easing:"linear",
delay:anime.stagger(100)

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


                
})






