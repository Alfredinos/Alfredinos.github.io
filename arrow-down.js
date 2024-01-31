
/* denne funksjonen kjøres fra starten for å gjøre animasjonen som viser pilene på portofoliopage */

let scrollDownEl = document.querySelector("#scrolldown");


async function scrolldown(){
    while (true){
        for (let i = 0; i<scrollDownEl.children.length; i++){
            await sleep(250);
            scrollDownEl.children[i].style.opacity = "1"
            scrollDownEl.children[i].style.filter = "blur(0)"
            scrollDownEl.children[i].style.transform = "translateY(100%)"
        }
        await sleep(1200)
        for (let i = 0; i<scrollDownEl.children.length; i++){
            scrollDownEl.children[i].style.opacity = "0"
            scrollDownEl.children[i].style.transform = "translateY(0)"
            scrollDownEl.children[i].style.filter = "blur(5px)"
        
        }
        
        await sleep(1000)
    }
}
scrolldown();