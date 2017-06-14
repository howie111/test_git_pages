
$(document).ready(function(){
        
   	if (localStorage.getItem("entryCollection") === null){
	//	var myJournal.collection =[];
        var myJournal = new Journal();
        myJournal.collection =[];
        $('#reminderModal').modal('show');
                
	} else{       
       //var myJournal.collection = JSON.parse(localStorage.getItem('entryCollection'));	
       var myJournal = new Journal();
       myJournal.collection =JSON.parse(localStorage.getItem('entryCollection'));
	}
     
// create a new entry
        $('#btn-save').click(function(){           
            var title = $('#title').val();
            var author = $('#author').val();
            var content = $('#content').val();
            var tags = $('#tags').val();
            var d = new Date();
            // date format  4/16/2017_10:30:08_AM, and we can use it as id later.
            var timestamp = d.toLocaleDateString() +"_" +d.toLocaleTimeString();  
            timestamp = timestamp.replace(" ","_");
            var newEntry = new Entry(title,author,content,tags,timestamp);
          //  myJournal.collection.push(newEntry);
            myJournal.addNewEntry(newEntry);
            //myJournal.display(); 
            localStorage.setItem("entryCollection",JSON.stringify(myJournal.collection))
             alert("An new entry is succesfully created");

    // console.log(title +" "+ author+" "+ content +" "+timestamp);
    })

    // list all myJournal.collection on overview page
    var lists = "";
    for(var i = 0; i<myJournal.collection.length;i++){
        
        lists += '<li>'+myJournal.collection[i].title+'</li>';
    }
    $('#lists').append(lists);
    // list all content of myJournal.collection
    var entriescontent = "";
    for (var i = 0;i<myJournal.collection.length;i++){
        entriescontent  += '<section class="entrysection" id ='+ myJournal.collection[i].timestamp+'>'+'<h3>'+myJournal.collection[i].title+'</h3>'+'<h4>'+myJournal.collection[i].author+'</h4>'+'<div>'+myJournal.collection[i].content+'</div>'+'<h5>#Tags: '+myJournal.collection[i].tags+'</h5>'+'<div class="row btn-container">'+'<input type="button" class="btn btn-success btn-edit" data-toggle="modal" data-target="#myModal" value = "Edit" id ='+ myJournal.collection[i].timestamp +'><input value="Delete" type ="button" class="btn btn-success btn-delete" id=d'+ myJournal.collection[i].timestamp+'></div>'+'</section>'      
    }
    $('#entriescontent').html(entriescontent);
    // when users click edit buttton, it will pop up an display modal 
   
    var edited_entry_id = '';
   
    $('.btn-edit').click(function(){
    // Timestamps are unique, we choose it as id to edit entry content  
        var entryid = this.id;
        edited_entry_id = entryid;
        var edited_entry = {};
        for(var i = 0; i <myJournal.collection.length;i++){
            if(myJournal.collection[i].timestamp==entryid){
               edited_entry=myJournal.collection[i];        
            }
        }
      // display the content in edit modal view     
        $('#edited_title').val(edited_entry.title);
        $('#edited_author').val(edited_entry.author);
        $('#edited_content').val(edited_entry.content);
        $('#edited_tags').val(edited_entry.tags);
        

    })
    // save the edited content 
    $('#edited_btn_save').click(function(){
        
        //var a =$('#edited_title').val(edited_entry.title);
        //console.log(a)

        for(var i = 0; i <myJournal.collection.length;i++){
            if(myJournal.collection[i].timestamp==edited_entry_id){
               myJournal.collection[i].title = $('#edited_title').val();
               myJournal.collection[i].author = $('#edited_author').val(); 
               myJournal.collection[i].content= $('#edited_content').val();
               myJournal.collection[i].tags = $('#edited_tags').val();
            }
        }
    // update the value in local storage
        var OldEntries = JSON.parse(localStorage.getItem('entryCollection'));
        OldEntries = myJournal.collection;
        localStorage.setItem("entryCollection",JSON.stringify(myJournal.collection))
    })
    // delete the entry according to unique id or timestamp

    $('.btn-delete').click(function(){
        /* becuase i have assigned id of btn-edit with timestamp,i have to make a differece for id of 
          of btn-delete with 'd+timestamp' */
        var del_timestap = this.id;
        del_timestap = del_timestap.replace('d','');
        var r = confirm("Are you deleting this entry permenantly?");
        if(r == true){
            //alert(del_timestap);
            
            myJournal.delentry(del_timestap);
            console.log(myJournal.collection);

            if(myJournal.collection.length ==0)
            {
                localStorage.removeItem('entryCollection');
            }
            else{

        // update the value in local storage
            var OldEntries = JSON.parse(localStorage.getItem('entryCollection'));
            OldEntries = myJournal.collection;
            localStorage.setItem("entryCollection",JSON.stringify(myJournal.collection))
        //
            }
            location.reload();
        }
         else{}
})


   //select only one checkbox in a group
   $('input[type="checkbox"]').on('change', function() {
   $('input[type="checkbox"]').not(this).prop('checked', false);
});

/* search by the word */

    $("#btn-search").on("click",function(){
        var word = $('#research_input').val();
       
        var resultitems = "";
        $('#tablebody').empty();

        if($('#word_checked').prop('checked')==true){
            var result = myJournal.searchbyword(word);
            // if there is no such entry based on users'research, it will pop up a reminder modal
            if(result.length == 0){
               $('#noresultModal').modal('show'); 
            }
            else{
              for(var i = 0;i<result.length;i++) {
                  resultitems +='<tr><th>'+result[i].title+'</th><th>'+result[i].author+'</th><th>'+result[i].timestamp+'</th><th>'+'<input type ="button" value="View" data-toggle="modal" data-target="#viewModal" class="btn btn-success btn-view" id=v'+ result[i].timestamp+ '></th></tr>';
                }   
            }        
        }
        else if($('#tag_checked').prop('checked')==true){
            var result = myJournal.searchbytag(word);
            if(result.length == 0){
                $('#noresultModal').modal('show'); 
            }
            else{  
               for(var i = 0;i<result.length;i++)
              {
                resultitems +='<tr><th>'+result[i].title+'</th><th>'+result[i].author+'</th><th>'+result[i].timestamp+'</th><th>'+'<input type ="button" value="View" data-toggle="modal" data-target="#viewModal" class="btn btn-success btn-view" id=v'+ result[i].timestamp+ '></th></tr>';
              }    
            } 
            }
        else{
            alert("Please select one type of searching");
        }

        $('#tablebody').append(resultitems); 

   // when you click the view button it will pop up a modal to show the entry      
        $('.btn-view').click(function(){

                var view_timestap = this.id;   
                view_timestap = view_timestap.replace('v','');
            
                var view_entry = {};
                for(var i = 0; i <myJournal.collection.length;i++){
                    if(myJournal.collection[i].timestamp==view_timestap){
                    view_entry=myJournal.collection[i];        
                    }
                }
  
                $('#view_title').text(view_entry.title);
                $('#view_author').text(view_entry.author);
                $('#view_content').text(view_entry.content);
                $('#view_tags').text(view_entry.tags);
        })


    })
// click close button to colse the modal
    $('.btn-close').click(function(){
        $('#myModal').modal('hide');
         
    })
// click close button to close the view modal
    $('.btn-view-close').click(function(){
        $('#viewModal').modal('hide');
         
    })



    })

