const searchBtn =
    document.getElementById('searchBtn');

searchBtn.addEventListener(
    'click',
    async () => {

        const keyword =
            document.getElementById('keyword').value;

        const response =
            await fetch(
                'http://localhost:3000/search',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        keyword
                    })
                }
            );

        const data =
            await response.json();

        const list =
            document.getElementById('urlList');

        list.innerHTML = '';

        data.urls.forEach(url => {

            const li =
                document.createElement('li');

            li.textContent = url;

            li.style.cursor = 'pointer';

            li.addEventListener(
                'click',
                () => downloadPage(url)
            );

            list.appendChild(li);

        });

    }
);

async function downloadPage(url) {

    const status =
        document.getElementById('status');

    status.textContent =
        'Загрузка...';

    try {

        const response =
            await fetch(
                'http://localhost:3000/download',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json'
                    },
                    body: JSON.stringify({
                        url
                    })
                }
            );

        const data =
            await response.json();

        localStorage.setItem(
            url,
            data.content
        );

        status.textContent =
            'Загрузка завершена';

        alert(
            `Скачано!\nРазмер: ${data.size} байт`
        );

        loadSavedPages();

    } catch (error) {

        status.textContent =
            'Ошибка загрузки';

        console.error(error);

    }

}

function loadSavedPages() {

    const savedList =
        document.getElementById(
            'savedPages'
        );

    savedList.innerHTML = '';

    Object.keys(localStorage)
        .forEach(key => {

            const li =
                document.createElement('li');

            li.textContent = key;

            li.style.cursor = 'pointer';

            li.addEventListener(
                'click',
                () => {

                    document
                        .getElementById(
                            'content'
                        )
                        .innerHTML =
                        localStorage.getItem(
                            key
                        );

                }
            );

            savedList.appendChild(li);

        });

}

loadSavedPages();