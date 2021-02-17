let key="AIzaSyD_gOgcxoao7rcxjygq9zvtGWNvdqIZG2w";
let contentElement = document.querySelector(".content");

let popularElements =document.createElement("div") 
popularElements.setAttribute("class","row ");
let videosElements = document.createElement("div")
let channelPageElement1 = document.createElement("div")
let div3 = document.createElement("div");
contentElement.append(popularElements,videosElements,channelPageElement1,div3);
let channelPageElement2 = document.createElement("div")

loadpopularVideos();

async function loadpopularVideos(){
    videosElements.innerHTML="";
    popularElements.innerHTML="";
    channelPageElement1.innerHTML="";
    channelPageElement2.innerHTML="";
    div3.innerHTML="";
        let videoResponse = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&key="+key) 
        let videoData = await videoResponse.json();
        for(let i=0;i< videoData.items.length;i++){
            createVideoContent(videoData.items[i])
        }
        console.log(videoData);
        // createVideoContent(videoData.items[0])
}

function createVideoContent(data){
      let eg1= data.id;
      let div1 = document.createElement("div");
      div1.setAttribute("class","col-12 col-sm-12 col-md-6, col-lg-4 col-xl-4 p-3")
      let frame1= document.createElement("iframe");
      frame1.height="230";
      frame1.width="330";
      frame1.src = "https://www.youtube.com/embed/"+eg1;
      let p1= document.createElement("p");
      p1.innerHTML=data.snippet.title;
      
      let a1 = document.createElement("a");
      a1.setAttribute("class",data.snippet.channelId);
      a1.style.fontSize="17px";
      a1.style.fontWight="50px";
      a1.addEventListener("mouseover", function( event ) {
        
        event.target.style.color = "red";
      
        // reset the color after a short delay
        setTimeout(function() {
          event.target.style.color = "";
        }, 500);
      }, false);

    a1.addEventListener("click",(e)=>{
        getChannelInfo(e.target.className);
    })  
    a1.innerHTML =data.snippet.channelTitle;
    
    let a2 = document.createElement("a");
    a2.innerHTML = "Views: "+ data.statistics.viewCount
    a2.style.marginLeft="10%"
      
      div1.append(frame1,p1,a1,a2);
      popularElements.append(div1);      
                     
}





document.querySelector(".but").addEventListener("click",()=>{
    search(document.querySelector(".in").value);
})

async function search(item){
    let response = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&key="+key+"&maxResults=20&q="+item)
    let result =  await response.json();
    console.log(result);
    showVideos(result);
}

function showVideos(result){
    videosElements.innerHTML="";
    popularElements.innerHTML="";
    channelPageElement1.innerHTML="";
    channelPageElement2.innerHTML="";
    div3.innerHTML="";
    for(let i=0;i< result.items.length;i++){
    if("videoId" in result.items[i].id)
    insertFrame(result.items[i])
    else if("channelId" in result.items[i].id)
    insertChannel(result.items[i])
    else
    console.log("playlistId")
    //insertChannel(result.items[i])
    }

}

function insertFrame(data){

    let eg1 = data.id.videoId;
    let div1 =  document.createElement("div");
    div1.setAttribute("class","row pt-3 border")
    let div11 =  document.createElement("div");
    div11.setAttribute("class","col-12 col-lg-4 col-xl-4")
    let frame1= document.createElement("iframe");
    frame1.height="230";
    frame1.width="350";
    frame1.src = "https://www.youtube.com/embed/"+eg1;
    

    let div12 =  document.createElement("div");
    div12.setAttribute("class","col-12 col-lg-6 col-xl-8")
    let p1 = document.createElement("p");
    p1.innerHTML=data.snippet.title;
    let p2 = document.createElement("p");
    p2.innerHTML=data.snippet.publishedAt;
    let a3 = document.createElement("a");
  
    a3.setAttribute("class",data.snippet.channelId);
    a3.style.fontSize="20px";
    a3.style.fontWight="50px";
    a3.addEventListener("mouseover", function( event ) {
        
        event.target.style.color = "red";
      
        // reset the color after a short delay
        setTimeout(function() {
          event.target.style.color = "";
        }, 500);
      }, false);

    a3.addEventListener("click",(e)=>{
        getChannelInfo(e.target.className);
    })  
    a3.innerHTML =data.snippet.channelTitle;

    let p4 = document.createElement("p");
    p4.innerHTML=data.snippet.description;

     div11.append(frame1);
     div12.append(p1,p2,a3,p4);
     div1.append(div11,div12);
    videosElements.append(div1);
}

async function insertChannel(data){
    let div1 =  document.createElement("div");
    div1.setAttribute("class","row pt-3 border")
    let div11 =  document.createElement("div");
    div11.setAttribute("class","col-12 col-lg-4 col-xl-4 ")
    let img1 = document.createElement("img");
    img1.src = data.snippet.thumbnails.medium.url;
    img1.style.paddingLeft="15%";
    
    
    let div12 =  document.createElement("div");
    div12.setAttribute("class","col-12 col-lg-6 col-xl-8")
    let a1 = document.createElement("a");
    a1.setAttribute("class",data.snippet.channelId);
    a1.style.fontSize="20px";
    a1.style.fontWight="50px";
    a1.addEventListener("mouseover", function( event ) {
        
        event.target.style.color = "red";
      
        // reset the color after a short delay
        setTimeout(function() {
          event.target.style.color = "";
        }, 500);
      }, false);

    a1.addEventListener("click",(e)=>{
        getChannelInfo(e.target.className);
    })  
    a1.innerHTML =data.snippet.title;
    let p2 = document.createElement("p");
    p2.innerHTML=data.snippet.publishedAt;
    let p3 = document.createElement("p");
    p3.innerHTML=data.snippet.description;
     
     div12.append(a1,p2,p3);
     div11.append(img1);
     div1.append(div11,div12);
    videosElements.append(div1);
}


async function  getChannelInfo(channelId){
        videosElements.innerHTML="";
        popularElements.innerHTML="";
        channelPageElement1.innerHTML="";
        channelPageElement2.innerHTML="";
        let channelResponse = await fetch("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CcontentOwnerDetails&id="+channelId+"&key="+key)
        let channelData = await channelResponse.json();
        console.log(channelData);
        let channelplayListResponse = await fetch("https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId="+channelId+"&maxResults=25&key="+key)
        let channelPlayListData = await channelplayListResponse.json();
        console.log(channelPlayListData); 
        //showChannelPage() is called here... to create channel info page
         showChannelPage(channelData,channelPlayListData);
    }

function showChannelPage(channelData,channelPlayListData){
        videosElements.innerHTML="";
        channelPageElement2.innerHTML="";
        channelPageElement1.innerHTML="";
        //createHeadElement() is called.... to create upper side of channel info page
        createHeadElement(channelData)        
        //createMiddleBar() is called.... to create a middle navbar 
        createMiddleBar(channelData,channelPlayListData);
        showPlayList(channelPlayListData);

}

function createHeadElement(data){
        let div1 = document.createElement("div");
        div1.setAttribute("class","row pt-3 border")
        let div11 =  document.createElement("div");
        div11.setAttribute("class","col-12 col-lg-4 col-xl-4 ")
        let img1 = document.createElement("img");
        img1.src = data.items[0].snippet.thumbnails.medium.url;
        img1.style.paddingLeft="15%";
        
        
        let div12 =  document.createElement("div");
        div12.setAttribute("class","col-12 col-lg-6 col-xl-8")
        let a1 = document.createElement("a");
        a1.setAttribute("class",data.items[0].id);
        a1.style.fontSize="20px";
        a1.style.fontWight="50px";
        a1.addEventListener("mouseover", function( event ) {
            
            event.target.style.color = "red";
          
            // reset the color after a short delay
            setTimeout(function() {
              event.target.style.color = "";
            }, 500);
          }, false);
    
        a1.addEventListener("click",(e)=>{
            getChannelInfo(e.target.className);
        })  
        a1.innerHTML =data.items[0].snippet.localized.title;
        let p2 = document.createElement("p");
        p2.innerHTML="Subscribers: "+ data.items[0].statistics.subscriberCount;
        let p3 = document.createElement("p");
        p3.innerHTML="Videos: "+ data.items[0].statistics.videoCount;
         
         div12.append(a1,p2,p3);
         div11.append(img1);
         div1.append(div11,div12);
        channelPageElement1.append(div1);
}

//creates middleBar
function createMiddleBar(channelData,channelPlayListData){
   div3.innerHTML="";
   div3.setAttribute("class","row border")
   let div31 = document.createElement("div");
   div31.setAttribute("class","col-2 col-md-2 col-lg-1 col-xl-1 p-1 border")
   let a1 = document.createElement("a");
   a1.innerHTML = "Playlist";
   a1.addEventListener("mouseover", function( event ) {
            
    event.target.style.color = "red";
  
    // reset the color after a short delay
    setTimeout(function() {
      event.target.style.color = "";
    }, 500);
  }, false);

   div31.addEventListener("click",(e)=>{
    showPlayList(channelPlayListData);
   })  
   

   

   let div33 = document.createElement("div");
   div33.setAttribute("class","col-2 col-md-2 col-lg-1 col-xl-1 p-1 border")
   let a3 = document.createElement("a");
   a3.innerHTML = "About";
   a3.addEventListener("mouseover", function( event ) {
            
    event.target.style.color = "red";
  
    // reset the color after a short delay
    setTimeout(function() {
      event.target.style.color = "";
     }, 500);
    }, false);

   div33.addEventListener("click",(e)=>{
    console.log("3")
    about(channelData);
   })  


   div31.append(a1);
   div33.append(a3);
   div3.append(div31,div33)
   contentElement.append(div3);
}

function showPlayList(channelPlayListData){
    channelPageElement2.innerHTML="";
    channelPageElement2.setAttribute("class","row pt-3")
    for(i=0;i< channelPlayListData.items.length; i++){
    let div4 = document.createElement("div");
    div4.setAttribute("class","col-sm-12 col-md-6 col-lg-4 col-xl-4 row");
    let div41 = document.createElement("div");
    div41.setAttribute("class","col-6")
    let img2 = document.createElement("img");
    img2.src= channelPlayListData.items[i].snippet.thumbnails.default.url;
    div41.append(img2)

    let div42 = document.createElement("div");
    div42.setAttribute("class","col-6")
    let a1 = document.createElement("a");
    a1.innerHTML= channelPlayListData.items[i].snippet.title;
    a1.setAttribute("class",channelPlayListData.items[i].id)
    a1.addEventListener("mouseover", function( event ) {
            
        event.target.style.color = "red";
      
        // reset the color after a short delay
        setTimeout(function() {
          event.target.style.color = "";
        }, 500);
      }, false);

    a1.addEventListener("click",(e)=>{
        showThatPlaylist(e.target.className);
    })
    let p2= document.createElement("p");
    p2.innerHTML="Videos: " + channelPlayListData.items[i].contentDetails.itemCount
    
    div41.append(img2)
    div42.append(a1,p2);
    div4.append(div41,div42);
    channelPageElement2.append(div4);
    }
    contentElement.append(channelPageElement2);
}

async function showThatPlaylist(id){
    channelPageElement2.innerHTML="";
    let plResponse = await fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=40&playlistId="+id+"&key="+key)
    let plData = await plResponse.json();
    
    console.log(plData);
    for(let i=0; i< plData.items.length;i++){
        insertFrame1(plData.items[i])
    }
    
    
}


function insertFrame1(data){
    
    let eg1 = data.snippet.resourceId.videoId;
    let div1 =  document.createElement("div");
    div1.setAttribute("class","row pt-3 border")
    let div11 =  document.createElement("div");
    div11.setAttribute("class","col-12 col-lg-4 col-xl-4")
    let frame1= document.createElement("iframe");
    frame1.height="230";
    frame1.width="350";
    frame1.src = "https://www.youtube.com/embed/"+eg1;
    

    let div12 =  document.createElement("div");
    div12.setAttribute("class","col-12 col-lg-6 col-xl-8")
    let p1 = document.createElement("p");
    p1.innerHTML=data.snippet.title;
    let p2 = document.createElement("p");
    p2.innerHTML=data.snippet.publishedAt;
    let a3 = document.createElement("a");
  
    a3.setAttribute("class",data.snippet.channelId);
    a3.style.fontSize="20px";
    a3.style.fontWight="50px";
    a3.addEventListener("mouseover", function( event ) {
        
        event.target.style.color = "red";
      
        // reset the color after a short delay
        setTimeout(function() {
          event.target.style.color = "";
        }, 500);
      }, false);

    a3.addEventListener("click",(e)=>{
        getChannelInfo(e.target.className);
    })  
    a3.innerHTML =data.snippet.channelTitle;

    let p4 = document.createElement("p");
    p4.innerHTML=data.snippet.description;

     div11.append(frame1);
     div12.append(p1,p2,a3,p4);
     div1.append(div11,div12);
     channelPageElement2.append(div1);
}


function about(channelData){
    console.log(channelData.items[0])
    channelPageElement2.innerHTML="";
    let p1 = document.createElement("p")
    p1.innerHTML="Country: " + channelData.items[0].snippet.country;
    p1.style.border = "1px solid black"
    p1.style.padding ="5px"
    let p2 = document.createElement("p")
    p2.innerHTML="Subscribers: " +channelData.items[0].statistics.subscriberCount;
    p2.style.border = "1px solid black"
    p2.style.padding ="5px"
    let p3 = document.createElement("p")
    p3.innerHTML="No. Of Videos: " +channelData.items[0].statistics.videoCount;                                                  
    p3.style.border = "1px solid black"
    p3.style.padding ="5px"
    let p4 = document.createElement("p")
    p4.innerHTML="ToTal Views: " +channelData.items[0].statistics.viewCount;
    p4.style.border = "1px solid black"
    p4.style.padding ="5px"
    channelPageElement2.append(p1,p2,p3,p4);
}