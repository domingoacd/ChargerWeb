document.onload = start();

function start(){
    let imageInterval;
    smoothScroll();
    checkMobileFeatures();
    insertProjectImages();
    manualSlideProjects();
    openProjectsOnClick();
    testVersionMessage();
}
function smoothScroll(){
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}
function manualSlideMainScreen(){
    let previous = document.getElementById("main-screen-previous"),
        next = document.getElementById("main-screen-next"),
        mainScreen = document.getElementById("main-screen"),
        slideActualNumber = document.getElementById("main-slide-actual"),
        currentImage = 1, 
        img = new Image();
    previous.addEventListener("click", (e)=>{
        e.preventDefault();
        currentImage == 1? currentImage = 10 : currentImage--;
        img.src = "img/main-backgrounds/main-background" + currentImage +".jpg";
        img.onload = ()=>{
            mainScreen.style.backgroundImage = "url("+img.src+")";
        }
        slideActualNumber.innerText = currentImage==10? currentImage : "0"+currentImage;
    })
    next.addEventListener("click", (e)=>{
        e.preventDefault();
        currentImage == 10? currentImage = 1 : currentImage++;
        img.src = "img/main-backgrounds/main-background" + currentImage + ".jpg";
        img.onload =()=> {
            mainScreen.style.backgroundImage = "url(" + img.src + ")";
        }
        slideActualNumber.innerText = currentImage == 10 ? currentImage : "0" + currentImage;
    })

}
function autoSlideMainScreen(isMobileSize){
    let mainScreen = document.getElementById("main-screen"),
        img = new Image(), 
        currentImage = 1;
    if (!isMobileSize){ 
        clearInterval(imageInterval)
    }else{
        imageInterval = window.setInterval(()=>{
            currentImage == 10 ? currentImage = 1 : currentImage++;
            img.src = "img/main-backgrounds/main-background" + currentImage + ".jpg";
            img.onload = ()=>{
                mainScreen.style.backgroundImage = "url(" + img.src + ")";
            }
        },5000)
}
}
function insertProjectImages(){
    let projects_slide = document.getElementById("projects-slide"),
        image_max_amount = 8;
        projects_slide.style.gridTemplateColumns = "repeat("+image_max_amount/2+",1fr)";
        projects_slide.style.gridTemplateRows = "1fr 1fr";
        for(let i = 0;i < image_max_amount;i++){
            let img = new Image();
            projects_slide.appendChild(img);
            img.src ="img/project-pic-"+i+".jpg";
            i % 3 == 0 ? img.height = "300" : img.height = "250";
        }
}
function checkMobileFeatures(){
    let mq = window.matchMedia("(max-width:680px)");
    mq.matches? autoSlideMainScreen(true) : manualSlideMainScreen();
    mq.addListener(()=>{
        if(mq.matches){
            autoSlideMainScreen(true);
        }else{
            manualSlideMainScreen();
            autoSlideMainScreen(mq.matches);
        }
    });
}
function manualSlideProjects(){
    let prev_projects = document.getElementById("prev-projects"),
        next_projects = document.getElementById("next-projects"),
        projects_slide = document.getElementById("projects-slide"),
        amountToDisplace = 400;
    prev_projects.addEventListener("click",()=>{
        let actualTransformValue = getTransformValue(projects_slide);
        if(actualTransformValue < 0){
            actualTransformValue + amountToDisplace > 0?
            projects_slide.style.transform = "translate(0px)"
            :projects_slide.style.transform = "translate(" + (actualTransformValue + amountToDisplace)+"px)";
        }
    });
    next_projects.addEventListener("click",()=>{
        let actualTransformValue = getTransformValue(projects_slide),
            widthDisplaced = projects_slide.offsetWidth + Math.abs(actualTransformValue),
            slideWidth = projects_slide.scrollWidth;
        if (widthDisplaced < slideWidth){
            widthDisplaced + amountToDisplace > slideWidth ? 
                projects_slide.style.transform = "translate(" + (actualTransformValue - (slideWidth - widthDisplaced)) + "px)"
                :projects_slide.style.transform = "translate(" + (actualTransformValue - amountToDisplace) + "px)";
        }
    });
}
function openProjectsOnClick(){
    let project_images = document.getElementById("projects-slide").querySelectorAll("img");
    project_images.forEach(image=>{
        image.addEventListener("click",()=>{
            let bigImageContainer = createContainer();
            insertACloseButtonOn(bigImageContainer);
            let projectImageBig = document.createElement("img");
            projectImageBig.src = image.src;
            window.innerWidth > 600? projectImageBig.style.width = "75vw" : projectImageBig.style.width = "100vw";
            bigImageContainer.appendChild(projectImageBig);
        })
    });
}
function createContainer(){
    let container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.right = "0";
    container.style.bottom = "0";
    container.style.zIndex = "10";
    container.style.minHeight = "600px";
    container.style.backgroundColor = "rgba(0,0,0,0.9)";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    document.body.insertBefore(container, document.body.firstChild);
    return container;
}
function insertACloseButtonOn(parent){
    let newCloseButton = document.createElement("span");
    newCloseButton.innerHTML = "<i class='far fa-times-circle'></i>";
    newCloseButton.style.color = "rgb(227,160,98)";
    newCloseButton.firstChild.style.fontSize = "50px";
    newCloseButton.style.position = "absolute";
    newCloseButton.style.zIndex = "20";
    newCloseButton.style.top = "50px";
    newCloseButton.style.right = "50px";
    newCloseButton.style.cursor = "pointer";
    newCloseButton.addEventListener("click",()=>{
        document.body.removeChild(parent);
    } );
    parent.appendChild(newCloseButton);
}
function testVersionMessage(){
    let links = document.querySelectorAll("[data-popup='true']");
    links.forEach(link=>{
        link.addEventListener("click", e=>{
            e.preventDefault();
            let container = createContainer(),
                messageTitle = document.createElement("h2"),
                message = document.createElement("p"),
                linkToPortfolio = document.createElement("a");
            insertACloseButtonOn(container);
            container.style.textAlign = "center";
            messageTitle.innerText = "Thanks for participate!";
            messageTitle.style.color = "white";
            messageTitle.style.fontSize = "4rem";
            messageTitle.style.paddingBottom = "10px";
            messageTitle.style.borderBottom = "1px solid rgb(227,160,98)";
            messageTitle.style.marginBottom = "30px";
            container.appendChild(messageTitle)
            message.innerText = "This is a test version. If you want to know more about my work, or contact me so"+
                                "we can work together on a project, click the link down below.";
            message.style.color = "white";
            message.style.fontSize = "1.3rem";
            message.style.marginBottom = "30px";
            container.appendChild(message);
            linkToPortfolio.href = "https://domingoacd.github.io/portfolio";
            linkToPortfolio.innerText = "To my portfolio.";
            linkToPortfolio.style.color = "rgb(227,160,98)";
            linkToPortfolio.style.border = "1px solid white";
            linkToPortfolio.style.fontSize = "1.3rem";
            linkToPortfolio.style.padding = "30px";
            // linkToPortfolio.style. = "20px";
            container.appendChild(linkToPortfolio);

        });
    })
}
function getTransformValue(obj){
    let transform = window.getComputedStyle(obj).transform;
    return Number(transform.split(",")[4]);
}