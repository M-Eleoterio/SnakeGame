window.onload = () => {
    const path = window.location.pathname.split('/')

    switch(path[1]) {
        case "":
            loadPage("home")
            break
        case "about":
            loadPage("about")
            break
        case "game":
            loadPage("game")
            break
        default:
            loadPage("404")
            break
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener("click", () => {
            const path = item.getAttribute("value")
            loadPage(path)

            if (path == "") {
                window.history.pushState("", "", "/")
                return
            }

            window.history.pushState("", "", path)

        })
    })

    function loadPage($path) {
        if ($path == "") return;

        const container = document.getElementById("container")

        const req = new XMLHttpRequest()

        req.open("GET", "pages/" + $path + ".html")
        req.send()
        req.onload = () => {
            if (req.status === 200) {
                container.innerHTML = req.responseText
                document.title = $path
            }
        }
    }
}