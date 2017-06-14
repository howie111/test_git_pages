
 



$(document).ready(function(){
        
   	if (localStorage.getItem("new1") === null){
		var Entries =[];
                
	} else{       
       var Entries = JSON.parse(localStorage.getItem('new1'));	
	}
     var myJournal = new Journal();
// create a new entry
        $('#btn-save').click(function(){         
            var myEntries = [];
           
            var title = $('#title').val();
            var author = $('#author').val();
            var content = $('#content').val();
            var tags = $('#tags').val();
            var d = new Date();
            // date format  4/16/2017_10:30:08_AM, and we can use it as id later.
            var timestamp = d.toLocaleDateString() +"_" +d.toLocaleTimeString();  
            timestamp = timestamp.replace(" ","_");

            var newEntry = new Entry(title,author,content,tags,timestamp);
            Entries.push(newEntry);
            myJournal.addNewEntry(newEntry);
            //myJournal.display(); 
            localStorage.setItem("new1",JSON.stringify(Entries))
             alert("An new entry is succesfully created");

    // console.log(title +" "+ author+" "+ content +" "+timestamp);
    })

    // list all entries on overview page
    var lists = "";
    for(var i = 0; i<Entries.length;i++){
        
        lists += '<li>'+Entries[i].title+ '-' +Entries[i].author+'</li>';
    }
    $('#lists').append(lists);
    // list all content of entries
    var entriescontent = "";
    for (var i = 0;i<Entries.length;i++){
        entriescontent  += '<section id ='+ Entries[i].timestamp+'>'+'<h2>'+Entries[i].title+'</h2>'+'<h3>'+Entries[i].author+'</h3>'+'<div>'+Entries[i].content+'</div>'+'<div class="row">'+'<input type="button" class="btn btn-success btn-edit" data-toggle="modal" data-target="#myModal" value = "Edit" id ='+ Entries[i].timestamp +'><input value="Delete" type ="button" class="btn btn-success btn-delete" id=d'+ Entries[i].timestamp+'></div>'+'</section>'      
    }
    $('#entriescontent').html(entriescontent);
    // when users click edit buttton, it will pop up an display modal 
   
    var edited_entry_id = '';
   
    $('.btn-edit').click(function(){
    // Timestamps are unique, we choose it as id to edit entry content  
        var entryid = this.id;
        edited_entry_id = entryid;
        var edited_entry = {};
        for(var i = 0; i <Entries.length;i++){
            if(Entries[i].timestamp==entryid){
               edited_entry=Entries[i];        
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

        for(var i = 0; i <Entries.length;i++){
            if(Entries[i].timestamp==edited_entry_id){
               Entries[i].title = $('#edited_title').val();
               Entries[i].author = $('#edited_author').val(); 
               Entries[i].content= $('#edited_content').val();
               Entries[i].tags = $('#edited_tags').val();
            }
        }
    // update the value in local storage
        var OldEntries = JSON.parse(localStorage.getItem('new1'));
        OldEntries = Entries;
        localStorage.setItem("new1",JSON.stringify(Entries))
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
        console.log(myJournal.collection);




    }
    else{

    }



        
        })





    })

