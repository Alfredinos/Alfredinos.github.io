
// sleep funksjon som er referert til i readme.md-filen
const sleep = ms => new Promise(r => setTimeout(r, ms));



// DEKLARERING AV VARIABLER
// ELEMENTER
let bodyEl = document.querySelector("#body");
let myNameEl = document.querySelector(".myName");
let myNameh1Els = document.querySelectorAll(".myName>h1");
let portofolioPage = document.querySelector("#portofolioPage");
let myPortofolioFile = document.querySelector("#myPortofolioFile");
let sourcesEl = document.querySelector("#sources");
let searchEl = document.querySelectorAll("#search h1, #navbarMobileTitle");
let cvPageEl = document.querySelector("#cvPage");
let cvFileEl = document.querySelector("#cvFile");
let projectsFileEl = document.querySelector("#projectsFile");
let projectsPageEl = document.querySelector("#projectsPage");
let introPageEl = document.querySelector("#introPage");
let introFile = document.querySelector("#introFile");

let folderEls = document.querySelectorAll(".folder");
let subFolderEls = document.querySelectorAll(".subFolder");

let title = document.querySelector("title");

let navbarMobileEl = document.querySelector("#navbarMobile img");
let pageEl = document.querySelector("#pages");

let undoEl = document.querySelectorAll(".undo");

let introButtons = document.querySelectorAll("#introButtons>div");


// TOGGLEVARIABLER / Boolean

let mobileSourcesToggle = true;
let mobileMode = false;
// SJEKKER OM JEG ER PÅ MOBIL ELLER IKKE
if(window.innerHeight > window.innerWidth){
    mobileMode = true;
}


// BACKEND LISTER SOM PASSER PÅ AT ALT ÅPNES OG LUKKES SOM DET SKAL
pageTargets = [
    "intro.html",
    "my_portofolio.md",
    "cv.pdf",
    "projects.html"
];
pageOpen = {
    "intro": true,
    "portofolio": false,
    "cv": false,
    "projects": false,
};
folderToggle = []
subFolderToggle = []


// EVENTLISTENERS FOR CLICK
introButtons.forEach((el, i)=>{
    el.addEventListener("click", ()=>{
        togglePage(pageTargets[i+1]);
    })
})
introFile.addEventListener("click", ()=>{
    togglePage("intro.html")
    if(mobileMode){
        toggleSources()
    }
});
myPortofolioFile.addEventListener("click", ()=>{
    togglePage("my_portofolio.md")
    if(mobileMode){
        toggleSources()
    }
});
cvFileEl.addEventListener("click", ()=>{
    togglePage("cv.pdf")
    if(mobileMode){
        toggleSources()
    }
});
projectsFileEl.addEventListener("click", ()=>{
    togglePage("projects.html")
    if(mobileMode){
        toggleSources()
    }
});
undoEl[0].addEventListener("click", ()=>togglePage("intro.html"));
undoEl[1].addEventListener("click", ()=>togglePage("intro.html"));
navbarMobileEl.addEventListener("click", toggleSources);


// variabler og sånt gjør jeg ikke kommentarer på



// ÅPNE OG LUKKE MAPPER SOM LIGGER I SOURCES 

for (let i = 0; i<folderEls.length; i++){
    folderToggle[i] = false;
    // legger til eventlisteners med en loop som gjør åpningen og lukking av mappene i sources
    folderEls[i].children[0].addEventListener("click", ()=>{
        if(!folderToggle[i]){
            folderEls[i].style.height = "1.7em";
            folderEls[i].style.overflow = "hidden";
            // endrer source til folder elementet som gir effekten om at den er åpen eller lukket.
            folderEls[i].children[0].children[0].src = "bilder/arrow-right.png"
            folderToggle[i] = true;
        } else {
            folderEls[i].style.height = "fit-content";
            // endrer source til folder elementet som gir effekten om at den er åpen eller lukket.
            folderEls[i].children[0].children[0].src = "bilder/arrow-down.png"
            folderToggle[i] = false;
        }
    })
}

// ÅPNE OG LUKKE UNDERMAPPER SOM LIGGER I SOURCES

for (let i = 0; i<subFolderEls.length; i++){
    subFolderToggle[i] = false;
    // legger til eventlisteners med en loop som gjør åpningen og lukking av mappene i sources
    subFolderEls[i].addEventListener("click", ()=>{
        if(!subFolderToggle[i]){
            // tempLength er hvor mange elemter av subFolderFiles det finnes
            temp = subFolderEls[i].parentElement.querySelectorAll(".folderFile");
            tempLength = temp.length;
            console.log(tempLength)
            for (let j = 0; j<tempLength; j++){
                temp[j].style.display = "none";
            }
            // endrer source til folder elementet som gir effekten om at den er åpen eller lukket.
            subFolderEls[i].children[0].src = "bilder/arrow-right.png"
            subFolderToggle[i] = !subFolderToggle[i];
        } else {
            temp = subFolderEls[i].parentElement.querySelectorAll(".folderFile");
            tempLength = temp.length;
            console.log(tempLength)
            for (let j = 0; j<tempLength; j++){
                temp[j].style.display = "flex";
            }
            // endrer source til folder elementet som gir effekten om at den er åpen eller lukket.
            subFolderEls[i].children[0].src = "bilder/arrow-down.png"
            subFolderToggle[i] = !subFolderToggle[i];
        }
    });
}

// LAGER EN FUNKSJON SOM OPPDATERER EVENTER OM ELEMENTER ER SYNLIGE ELLER IKKE 
// referert til i readme.md-filen
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            entry.target.classList.remove('hidden');
        } else{
            entry.target.classList.remove('show');
            entry.target.classList.add('hidden');
        }
    })
})

let hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el)=>observer.observe(el));


// LAGD FOR MOBILVERSJON SOM ÅPNER OG LUKKER SOURCES

async function toggleSources(){
    if(!mobileSourcesToggle){
        // istedenfor å gjøre dette i css var det mye lettere å hente 
        // vidden til elementet i pixler i javascript og flytte det på den måten
        bodyEl.style.transform = "translateX(-" + sourcesEl.getBoundingClientRect().width + "px)";
        await sleep(500)
        bodyEl.style.width = "fit-content"
        pageEl.style.width = "100vw";
    } else {
        bodyEl.style.transform = "translateX(0)";
        await sleep(500)
        bodyEl.style.width = ""
        pageEl.style.width = "82vw";
    }
    mobileSourcesToggle = !mobileSourcesToggle
}

// EN FUNKSJON SOM BRUKES HVER GANG JEG ÅPNER ELLER LUKKER EN SIDE

function togglePage(page){
    toggleOffAllPages()
    // bruker variablen page som puttes inn via eventlistenererne til å 
    // vite hvilken side som åpnes og lukkes
    if(page == "intro.html" && !pageOpen.intro){
        introPageEl.classList.add("showPage");
        introPageEl.classList.remove("hidePage");

        pageOpen.intro = true;
        introFile.style.backgroundColor = "#444";
    }
    if(page == "my_portofolio.md" && !pageOpen.portofolio){
        portofolioPage.classList.add("showPage");
        portofolioPage.classList.remove("hidePage")

        makeMyName()
        pageOpen.portofolio = true;
        myPortofolioFile.style.backgroundColor = "#444";
    }
    if(page == "cv.pdf" && !pageOpen.cv){
        cvPageEl.classList.add("showPage");
        cvPageEl.classList.remove("hidePage")

        pageOpen.cv = true;
        cvFileEl.style.backgroundColor = "#444";
    }
    if(page == "projects.html" && !pageOpen.projects){
        projectsPageEl.classList.add("showPage");
        projectsPageEl.classList.remove("hidePage")

        pageOpen.projects = true;
        projectsFileEl.style.backgroundColor = "#444";
    }
    for (let i = 0; i<searchEl.length; i++){
        searchEl[i].innerText = page;
    }
    title.innerText = page;
}

// EN FUNKSJON SOM HJELPER MED Å LUKKE ALLE SIDENE. DETTE BRUKES FOR Å ÅPNE NYE SIDER.

function toggleOffAllPages(){
    // Fjerner alle sider som første steg til åpne sider funksjonen
    introPageEl.classList.add("hidePage");
    introPageEl.classList.remove("showPage");

    portofolioPage.classList.add("hidePage");
    portofolioPage.classList.remove("showPage");

    cvPageEl.classList.add("hidePage");
    cvPageEl.classList.remove("showPage");

    projectsPageEl.classList.add("hidePage");
    projectsPageEl.classList.remove("showPage");
    // bruker klassen hide og showpage for å endre elementene i css
    // dette lager en kobling mellom css og javascript for å style

    introFile.style.backgroundColor = "";
    myPortofolioFile.style.backgroundColor = "";
    cvFileEl.style.backgroundColor = "";
    projectsFileEl.style.backgroundColor = "";

    // gjør navnet mitt usynlig igjen for å kunne starte animasjonen på nytt
    // når man åpner siden med navnet på nytt
    for (let i = 0; i<myNameh1Els.length; i++){
        myNameh1Els[i].style.opacity = "0";
    }

    for (let i in pageOpen) {
        pageOpen[i] = false;
    }
}

// EN FUNKSJON SOM GJØR NAVNET MITT SYNLIG MED EN ANIMASJON PÅ PORTOFØLJE SIDEN

async function makeMyName(){
    for (let i = 0; i<myNameh1Els.length; i++){
        myNameh1Els[i].style.opacity = 0;
    }
    for (let i = 0; i<myNameh1Els.length; i++){
        await sleep(50);
        myNameh1Els[i].style.opacity = "1";
    }
}


// START FUNKSJONER
togglePage("intro.html");