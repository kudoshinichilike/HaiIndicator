if (location.protocol === 'http:' && location.hostname === '') {
    location.href = 'https://'
}

window.addEventListener('DOMContentLoaded', function () {
    if (!mobile()) {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r45/Three.js', function () {
            AttractorsTrip()
            setTimeout(function () {
                document.querySelector('#webgl').style.opacity = 1
            }, 1000)
        })
    } else {
        document.querySelector('#content').style.opacity = 1
    }
})

function mobile() {
    return false
    // return /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i
    //   .test(navigator.userAgent.toLowerCase())
}

function loadScript(url, done) {
    // http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
    var script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) { // IE
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null
                done()
            }
        }
    } else { // Others
        script.onload = function () {
            done()
        }
    }

    script.src = url
    document.body.appendChild(script)
}