document.addEventListener('DOMContentLoaded', function () {
    let { DateTime } = luxon //Biblioteca de dados sobre data e hora, como fusos horários
    //O uso de chaves em DateTime serve para desestruturar o objeto, e extrair suas propriedades. Sem isso, teriamos algo como: const DateTime = luxon.DateTime 
    let timeZones = Intl.supportedValuesOf('timeZone')
    let fromTimeZoneSelect = document.getElementById('fromTimeZone')
    let toTimeZoneSelect = document.getElementById('toTimeZone')
    let result = document.getElementById('result')

    timeZones.forEach(timeZone => {
        let option = document.createElement('option')
        option.value = timeZone
        option.textContent = timeZone
        //ter o contexto do texto do elemento serve para mostrar o conteúdo do elemento em texto,
        //baseado em seu valor (Nesse caso, option tem timeZone como valor e contexto)
        fromTimeZoneSelect.appendChild(option.cloneNode(true))
        toTimeZoneSelect.appendChild(option)
    })

    function convertTime() {
        let fromTimeZone = fromTimeZoneSelect.value     
        let toTimeZone = toTimeZoneSelect.value

        if (!fromTimeZone || !toTimeZone) {
            result.textContent = 'Por favor, insira os fusos horários.'
            return
        }

        let now = DateTime.now().setZone(fromTimeZone)
       
        let currentTimeInFromZone = now.toFormat('dd/MM/yyyy HH:mm:ss')
       
        let convertedTime = now.setZone(toTimeZone).toFormat('dd/MM/yyyy HH:mm:ss')

        result.textContent = `A data e hora atual no fuso horário de ${fromTimeZone} é: ${currentTimeInFromZone}.\n`
        result.textContent += ` A data e hora convertida para ${toTimeZone} é: ${convertedTime}`
        
    }

    function updateTime(){
        let timeElement = document.getElementById('time')
        let timeNow = new Date()
        let hours = timeNow.getHours().toString().padStart(2, '0')
        let minutes = timeNow.getMinutes().toString().padStart(2, '0')
        let seconds = timeNow.getSeconds().toString().padStart(2, '0')
        let timeString = ` ${hours}:${minutes}:${seconds}`
        timeElement.textContent = timeString

    }

    setInterval(updateTime, 1000)
    updateTime()

    document.getElementById('convertButton').addEventListener('click', convertTime)

})


 // let optionsFrom = { timeZone: fromTimeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
        // let dateTimeInFromZone = new Date(now.toLocaleString('en-US', optionsFrom))
        
        // let currentTimeInFromZone = new Intl.DateTimeFormat('pt-BR', optionsFrom).format(now)
        // let dateTimeInUTC = new Date(dateTimeInFromZone.toLocaleString('en-US', { timeZone: 'UTC' }))
        // let optionsTo = { timeZone: toTimeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
        // let convertedTime = new Intl.DateTimeFormat('pt-BR', optionsTo).format(dateTimeInUTC)
                // result.textContent = `A data e hora convertida de ${fromTimeZone} (${currentTimeInFromZone})  para ${toTimeZone} é: ${convertedTime}`
