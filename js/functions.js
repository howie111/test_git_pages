/* create the object of entry */

function Entry(title,author,content,tags,timestamp){
    this.title = title;
    this.author = author;
    this.content = content;
    this.tags = tags;
    this.timestamp = timestamp;
}
/* */
function Journal(){
   this.collection = [];
   /* add a new entry uisng new object */
   this.addNewEntry = function(entry){
        this.collection.push(entry);
   }
   /* add entry to collection*/
   this.display = function(){
        console.log(this.collection[0].title +" "+ this.collection[0].author+" "+ this.collection[0].content +" "+this.collection[0].timestamp);
   }
   /* delete entry according unique timestap(ID)*/
   this.delentry = function(timestamp){
       var del = {};
       for(var i = 0; i<this.collection.length;i++){
           if(timestamp ==this.collection[i].timestamp){
            del = this.collection[i];
           }
        var index = this.collection.indexOf(del);
        if(index>-1){
            this.collection.splice(index,1);
        }
       }
   }
   

   // search by word 
   this.searchbyword = function(word){
       
       var resultentries = [];
       for(var i = 0;i<this.collection.length;i++){
         if(this.collection[i].author.includes(word)||this.collection[i].content.includes(word)||this.collection[i].title.includes(word)){
             resultentries.push(this.collection[i]);
         }
       }
       return resultentries;
   }
   this.searchbytag = function(etags){
       var resultentries = [];
       for(var i = 0;i<this.collection.length;i++){
         if(this.collection[i].tags.includes(etags)){
             resultentries.push(this.collection[i]);
         }
       }
       return resultentries;
       }
 




}
