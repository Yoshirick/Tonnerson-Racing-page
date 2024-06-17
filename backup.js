document.addEventListener('DOMContentLoaded', function () {
    let timeZones = Intl.supportedValuesOf('timeZone')
    let fromTimeZoneSelect = document.getElementById('fromTimeZone')
    let toTimeZoneSelect = document.getElementById('toTimeZone')
    let dateTimeInput = document.getElementById('dateTime')
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
        let dateTimeValue = dateTimeInput.value
        let fromTimeZone = fromTimeZoneSelect.value
        let toTimeZone = toTimeZoneSelect.value

        if (!dateTimeInput) {
            result.textContent = 'Por favor, insira uma data e hora valida.'
            return
        }

        let dateTime = new Date(dateTimeValue)
        let optionsFrom =  { timeZone: fromTimeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}
        let dateTimeInFromZone = new Date(now.toLocaleString('en-US', optionsFrom))

        let dateTimeInUTC = new Date(dateTimeInFromZone.toLocaleString('en-US', { timeZone: 'UTC' }))
        let optionsTo = { timeZone: toTimeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}
        let convertedTime = new Intl.DateTimeFormat('pt-BR', optionsTo).format(dateTimeInUTC)

        result.textContent = `A data e hora convertida para ${toTimeZone} é: ${convertedTime}`
    }

    document.getElementById('convertButton').addEventListener('click', convertTime)

})
