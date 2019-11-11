document.querySelector("#about-me").addEventListener("click", addContent);
document.querySelector("#works").addEventListener("click", addContent);

function addContent(event){
    const content = document.createElement("div");

    function clears(){
        document.querySelector(".dyno").innerHTML = "";
    }

    clears();
    
    const xhr = new XMLHttpRequest();

    xhr.onload = function(){
        if(this.status == 200){

            const head = document.createElement("h2");
            const paragraph = document.createElement("p");

            const close = document.createElement("div");
            close.className = "close";
            close.textContent = "[X] Close";
            close.style.cursor = "pointer";
            close.addEventListener("click", clears)

            const response = JSON.parse(this.responseText)

            if(event.target.id == "about-me"){
                head.textContent = "About Me"
                paragraph.textContent = response.aboutMe;
            }
            else if(event.target.id == "works"){
                head.textContent = "Works";
                paragraph.innerHTML = response.works;
            }
            content.className = "content";
            content.appendChild(head);
            content.appendChild(paragraph);
            
            document.querySelector(".dyno").appendChild(content);
            document.querySelector(".dyno").appendChild(close);
        }
    }
    xhr.open("GET", "assets/me.json")
    xhr.send();
}