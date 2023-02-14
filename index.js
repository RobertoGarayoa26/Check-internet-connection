 //retorna el elemento seleccionado
 const popup = document.querySelector(".popup"),
 wifiIcon= document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesconnect = document.querySelector(".desconnect"),
reconnectButton = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10

const checkConnection = async () => {
    try{
        /*
            Si el código del status se encuentra entre 200 y 300
            la conexión a internet será 'online'.
         */
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        isOnline = response.status >= 200 && response.status < 300
    }catch (error){
        isOnline = false    //Si la conexión arroja un error, la conexión se considera 'offline'.
    }
    timer=10
    clearInterval(intervalId)   //Cancela una acción reiterativa que se inició mediante una llamada setInterval()
    handlePopup(isOnline)
}

const handlePopup = (status) => {
    /*Si status === true, removerá la clase "show" del popup, de lo
    contrario la agregará*/
    if(status) {    //if status es true (online), actualiza el icono, titulo y descripción
        wifiIcon.className = "uil uil-wifi"
        popupTitle.innerText = "Restored Connection"
        popupDesconnect.innerHTML = "Your device is now successfully connected to the internet"
        popup.classList.add("online")
        return setTimeout(()=>popup.classList.remove("show"), 2000)
    }
    //if status es false (offline), actualiza el icono, título y descripción
    wifiIcon.className = "uil uil-wifi-slash"
    popupTitle.innerText = "Lost Connection"
    popupDesconnect.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds"
    //Si el status === false, entonces está online
    popup.className = "popup show"

    /*
        Se establece un tiempo con intervalo en decremento cada 1 seg
    */

    intervalId = setInterval(() => {
        timer--
        //Si el timer llega a 0, comprobará la conexión otra vez
        if(timer === 0) checkConnection()
        popup.querySelector(".desconnect b").innerText = timer
    }, 1000)
}

/*
    setInterval(): Llama a una función o ejecuta un fragmento de código
    de forma reiterada, con un retardo de tiempo fijo entre cada llamada.

    - Esta función comprueba el status de la conexión cada 3 segundos

    Si el dispositivo está 'online', la API hará una llamada exitosa y la respuesta será '200'.
    Si el dispositivo está 'offline', la API fallará con la llamada y la respuesta será menor a '200'.
 */
setInterval(() => isOnline && checkConnection(), 3000)
reconnectButton.addEventListener("click", checkConnection)