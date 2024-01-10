
<!-- Estructura principal de la página principal de los usuarios registrados -->
<?php
session_start();

if(!isset($_SESSION['id'])){
    header("Location:../html/index.html");
}



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;400;700;800;900&family=Roboto+Mono:wght@100;200;400;700&family=Tektur:wght@400;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/dashboard.css">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/166c59dd53.js" crossorigin="anonymous"></script>
    <script src="../js/anime.js"></script>
    <script src="../js/dashboard_registered.js"></script>
    <script src="../js/dashboard_registered_help_functions.js"></script>
    <script src="https://unpkg.com/i18nextify@^3.2.1" id="i18nextify" fallbacklng="en"></script>

    <noscript>
        <style>
            body{
              display: none;
            }
            
          </style>
    </noscript>
</head>
<body>
   
    <!-- PRINCIPAL NAVBAR (contains) -> Filters, Logotype, user_data and configuration -->
    <div id="control_bar">
        <!-- Allow us to "encapsulate" the actual content inside of the navbar -->
        <div id="control_bar_content">

            <span id="menu_handler" class="material-symbols-outlined">
                menu_open
            </span>
        
        <!-- LOGO AND TEXT -->
        <div id="logo">
            <img src="../media/logo1.png" alt="">
            <p>DISCIPLINE</p>
           
        </div>

        <!-- USER #ID -->
        <div id="idd">User</div>
        

            


        
        </div>

        
    </div>


    <!-- This is the area that let us filter the content   -->

    


    <!-- Contains the button to create a new TASK -->
    <div id="button_container">
        <!-- Buttons that open the frame to create the actual TASK -->


        <button><span id="add_btn_span" class="material-symbols-outlined">
            add_circle
            </span></button>
            <div id="underline_animation"></div>
        </div>
    </div>



   
    <!-- TASK CREATION INTERFACE -> Here user will add all required inputs -->
     <div hidden id="create_task">

        

        <!-- User will add TITLE of TASK, and DESCRIPTION -->
        <div id="title_and_description">
            <input id="d_title" maxlength="50" type="text" placeholder="Title ***" autocomplete="off">
            <input id="d_description" maxlength="200" placeholder="Description ***" autocomplete="off">
        </div>

        <div class="headers" id="subtasks">
            <div class="title_and_span">
                <div class="title">Subtasks</div>
                <span class="material-symbols-outlined">
                    expand_less
                </span>
            </div>
            

            <div  class="inpCover"><input class="d_subtask" id="d_subtask1" type="text" placeholder="Step 1" autocomplete="off"></div>
            <div  class="inpCover"><input class="d_subtask" id="d_subtask2" type="text" placeholder="Step 2" autocomplete="off"></div>
            <div  class="inpCover"><input class="d_subtask" id="d_subtask3" type="text" placeholder="Step 3" autocomplete="off"></div>
            <div  class="inpCover"><input class="d_subtask" id="d_subtask4" type="text" placeholder="Step 4" autocomplete="off"></div>
            <div  class="inpCover"><input class="d_subtask" id="d_subtask5" type="text" placeholder="Step 5" autocomplete="off"></div>
            <div  class="inpCover"><input class="d_subtask" id="d_subtask6" type="text" placeholder="Step 6" autocomplete="off"></div>
            <div  class="inpCover"><input class="d_subtask" id="d_subtask7" type="text" placeholder="Step 7" autocomplete="off"></div>
            <div  class="inpCover"><input class="d_subtask" id="d_subtask8" type="text" placeholder="Step 8" autocomplete="off"></div>
            
            
            
        </div>
        <div class="headers" id="type">
            <div class="title_and_span">
                <div class="title">Task Type</div>
                <span class="material-symbols-outlined">
                    expand_less
                </span>
            </div>

            <ul id="d_types">
                <li id="work">Work</li>
                <li id="personal">Personal</li>
                <li id="home">Home</li>
                <li id="shopping">Shopping</li>
                <li id="health">Health</li>
                <li id="meeting">Meeting</li>
                <li id="event">Event</li>
                <li id="travel">Travel</li>
                <li id="study">Study</li>
                <li id="read">Read</li>
                <li id="write">Write</li>
                <li id="social">Social</li>
                <li id="hobby">Hobby</li>
                <li id="financial">Financial</li>
                <li id="routine">Routine</li>
                <li id="project">Project</li>
                <li id="deadline">Deadline</li>
                <li id="routine">Routine</li>
                <li id="chores">Chores</li>
                <li id="reminder">Reminder</li>
                <li><input type="text" placeholder="OTHER..." autocomplete="off"></li>
                
            </ul>

           
        </div>
        
        <div class="headers" id="flags">

            <div class="title_and_span">

                <div class="title">Flags</div>
                <span class="material-symbols-outlined">
                    expand_less
                </span>
            </div>
            
            <ul id="d_flags">
                <li id="0">0 - Not Important</li>
                <li id="3">1-3 Low Importance</li>
                <li id="6">4-6 Medium Importance</li>
                <li id="9">7-9 High Importance</li>
                <li id="10">10 - Critical</li>
            </ul>
            </div>

            <div class="headers" id="hashtags">


                <div class="title_and_span">
                    <div class="title">Hashtags</div>
                    <span class="material-symbols-outlined">
                        expand_less
                    </span>
            </div>

                <ul id="d_hashtags">
                    <input  id="hashtag1"type="text" placeholder="#" autocomplete="off">
                    <input  id="hashtag2"type="text" placeholder="#" autocomplete="off">
                    <input  id="hashtag3"type="text" placeholder="#" autocomplete="off">
                </ul>
            </div>


            <div class="headers" id="date">
                <div class="title_and_span">
                    <div class="title">Expiration Date</div>
                    <span class="material-symbols-outlined">
                        expand_less
                    </span>
                </div>
            <i id="open_date_input" class="fa-solid fa-calendar-days"></i>
                <ul>
                    <input id="d_date" type="date" autocomplete="off">
                    
                </ul>

                
                
            </div>
            

            <div id="create_cancel">
                
                    <button id="d_cancel">Cancel</button>
                    <button id="d_add_task">Add Task</button>   
            </div>


        

     </div> <!-- HERE ENDS THE TASK CREATION INTERFACE -->


     <div id="main_content">

        <div id="filters">

            <p id="show_all" class="active"><span class="material-symbols-outlined">
                all_inbox
                </span> All </p>
            <p id="show_not_started"><span class="material-symbols-outlined">
                not_started
                </span>Not started</p>
            <p id="show_pending"><span class="material-symbols-outlined">
            line_start_diamond
                </span>Pending</p>
            <p id="show_completed"><span class="material-symbols-outlined">
                checklist
                </span>Completed</p>
            <p id="show_date"><span class="material-symbols-outlined">
                calendar_month
                </span>Show by date</p>
            <p id="show_expired"><span class="material-symbols-outlined">
                mood_bad
                </span>Expired</p>
                <p id="show_today"><span class="material-symbols-outlined">
                    today
                    </span>Today</p>
            
            

            <div id="type_of_filter">

                <div class="filter">
                    <label for="fa">By Hashtags</label>
                    <input id="fa" value="HASHTAG" type="radio" name="filter_type" autocomplete="off">
                </div>
                <div class="filter">
                    <label for="fb">By Importance</label>
                    <input id="fb" value="IMPORTANCE" type="radio" name="filter_type" autocomplete="off">
                </div>
                <div class="filter">
                    <label for="fc">By Family Type</label>
                    <input id="fc" value="FAMILY TYPE" type="radio" name="filter_type" autocomplete="off">
                </div>
                <div class="filter">
                    <label for="fe">By Description</label>
                    <input id="fe" value="DESCRIPTION" type="radio" name="filter_type" autocomplete="off">
                </div>
                <div class="filter">
                    <label for="ff">By Subtasks (contains) </label>
                    <input id="ff" value="SUBTASKS" type="radio" name="filter_type" autocomplete="off">
                </div>
                <div class="filter">
                    <label for="fg">By Title </label>
                    <input id="fg" value="TITLE" type="radio" name="filter_type" autocomplete="off">
                </div>

                <div id="faq">?</div>
               

                
                <input id="search" type="search" placeholder="Quick Find">
                <p id="filter_selected">Filtering by: </p>
            </div>
            

            <button id="gen_pdf"><i class="fa-solid fa-file-pdf"></i> </button>
        </div>



         <div id="all_tasks" >

         <div class="history" >
            <div> <div class="not-started"></div><p>NOT STARTED</p></div>
            <div> <div class="pending"></div><p>PENDING</p></div>
            <div> <div class="completedd"></div><p>COMPLETED</p></div>
            <div> <div class="expired"></div><p>EXPIRED</p></div>

            <i class="fa-solid fa-xmark hide_help"></i>
         </div>
    
            <div id="all_tasks_header">
                <h1>ALL TASKS</h1>
                <span id="refresh" class="material-symbols-outlined">
                    
                </span>
                
                
                <div id="tasks_positioning">
                    <span class="material-symbols-outlined collapse_show">
                        collapse_all
                        </span>
                    <span id="grid_view" class="material-symbols-outlined">
                        grid_view
                    </span><span id="flex_view" class="material-symbols-outlined">
                        table_rows
                    </span>
                    
                </div>

                
            </div>
            <div id="helpers">
                
                <p>TITLE</p>
                
                <p>IMPORTANCE</p>
                <p>TYPE</p>
                
            </div>
           

                <div class="box"id="all_tasks_in">
                    
                </div>
                 <div class="box"id="not_started_tasks"></div>

                <div class="box"id="pending_tasks"></div>

                <div class="box"id="completed_tasks"></div>

                <div class="box"id="filtered_tasks"></div>

                <div class="box" id="show_by_date">
                

                
                <div id="1"class=" typemonth jan">January</div>
                <div id="2"class=" typemonth feb">February</div>
                <div id="3"class=" typemonth mar">March</div>
                <div id="4"class=" typemonth apr">April</div>
                <div id="5"class=" typemonth may">May</div>
                <div id="6"class=" typemonth jun">June</div>
                <div id="7"class=" typemonth jul">July</div>
                <div id="8"class=" typemonth aug">August</div>
                <div id="9"class=" typemonth sep">September</div>
                <div id="10"class=" typemonth oct">October</div>
                <div id="11"class=" typemonth nov">November</div>
                <div id="12"class=" typemonth dec">December</div>

                <div id="month"></div>

                <div id="tasks_by_month">
                    <h1>TITLES OF EACH TASK</h1>
                    <div id="titles_here"></div>
                </div>

            </div>
            <div class="box" id="expired_tasks"></div>
            <div class="box" id="today_tasks"></div>

                
            <div id="specific_filters"></div>

    
        
            

        


       
        

     </div>
     <div id="stats">
        <span class="material-symbols-outlined">
            arrow_left
            </span>
       
            

            <div id="data">
            <p>Total tasks:</p>
            <p class=" stat res_total_created"></p>

            <p>Not started tasks:</p>
            <p class=" stat res_total_not_started"></p>

            <p>Pending tasks:</p>
            <p class=" stat res_total_pending"></p>

            <p>Completed tasks:</p>
            <p class=" stat res_total_completed"></p>

            

            <p> Expired tasks: </p>
            <p class=" stat res_total_expired"></p>

            <p> % Completed </p>
            <p class=" stat perc_completed"></p>

            </div>

            

        </div>
     </div>

    

     <div id="deleted_message">
        <h1>Task deleted</h1>
     </div>

     <div id="tooltip">Create Task</div>
     <div id="bottom_shadow"></div>


     <dialog id="task_inserted">
            <div>
               
            </div>
     </dialog>

     <dialog id="dialog_deleted_task">

            <div>
            <i class="fa-solid fa-trash-can"></i>
            </div>
     </dialog>


     <dialog id="user_configuration">
        
        <div id="user_configuration_box">
            <!-- <div class="config_items" ><p>Update Photo</p><i class="fa-solid fa-id-card"></i></div> -->
            <div class="config_items account_settings" ><p>Account Settings</p> <i class="fa-solid fa-gears"></i></div>
            <div class="config_items logout" ><p>Log Out</p> <i class="fa-solid fa-right-from-bracket"></i></div>
            <div id="lngs">
                <span id="en">EN</span>
                <span id="es">ES</span>
            </div>

            <i class="fa-solid fa-xmark close_configuration"></i>
        </div>

     </dialog>

     <dialog id="confirm_delete">
        <div>
            <p>Are you sure?</p>
            <button id="cancel">No</button>
            <button id="confirm">Yes</button>
        </div>
     </dialog>

                <dialog id="dialog_faq">
                    <div id="faq_rules">
                        <p><span>HASHTAGS</span> : Write the entire HASHTAG name.</p>
                        <p><span>IMPORTANCE</span> : Write 0, 3, 6, 9 or 10</p>
                        <p><span>FAMILY TYPE</span> : Write any letter and it will search TASKS</p>
                        <p><span>DESCRIPTION</span> : Write any letter and it will search TASKS</p>
                        <p><span>SUBTASKS</span> : Write the entire SUBTASK name</p>
                        <p><span>TITLE</span> : Write any letter and it will search TASKS</p>
                    </div>
                    

                </dialog>




     <!-- CHARTS and PROGRESS BARS -->

     <div id="charts_and_progress">
        
        
        <div class="progress" id="progress_subtasks">
            <h1>Total Subtasks Created</h1>
            <p id="total_subtasks"></p>
        </div>
        <canvas id="myChart">
            
            </canvas>
        <div  class="progress" id="progress_hashtags">
            <h1>Total Hashtags Created</h1>
            <p value="0" id="total_hashtags"></p>
        </div>

        
       
    </div>

    

   
    
    

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> <!-- charts -->
    <script>
        
        const ctx = document.getElementById('myChart');
        let user_id = new URLSearchParams(window.location.search);
        user_id = user_id.get("id");
        let formd = new FormData();
            formd.append("id", user_id)
        
        fetch("../php/stats.php",{
            method:"POST",
            body: formd
        })
        .then(response=>response.json())
        .then(data=>{


            
            new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: ['Not Started', 'Pending', 'Completed', 'Expired'],
            datasets: [{
                
                data: [data.not_started, data.pending, data.completed, data.expired],
                borderWidth: 1,
                backgroundColor: ["#A2CFE2","#F8E71C","#96D38C","#ff0052"],
                borderColor:"black",
                width:"400px",
                height:"400px"
            }]
            },
            options:{
                
                plugins:{
                    legend:{
                        position:"bottom",
                        display:false
                    },
                    title:{
                        display:true,
                        text:"Stats",
                        color:"white",
                        
                    }
                }
               
            }
            
        });
       
       

        
            let tm = anime.timeline({
           
           easing:"linear",
           
       })
          
   
       
           tm.add({
               targets:"#total_subtasks",
               delay:"3000",
                   value: [0,data.subtasks],
                   textContent:"0",
                   
                   
               })
           tm.add({
               targets:"#total_subtasks",
               textContent:data.subtasks,
               round:1,
               duration:500
           })

           tm.add({
               targets:"#total_hashtags",
               value: [0,data.hashtags],
               textContent:"0",
               
           })
           tm.add({
               targets:"#total_hashtags",
               textContent:data.hashtags,
               round:1,
               duration:500
           })
           
        

        
        })
        

       
      
       
        
</script>
<script src="https://unpkg.com/jspdf-invoice-template@1.4.0/dist/index.js"></script>


     
</body>
</html>