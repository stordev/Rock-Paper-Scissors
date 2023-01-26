const fetchContent = async (url, className, callback) => {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            // Parse HTML string into DOM nodes and append to current content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            if (className.charAt(0) !== '.') className = `.${className}`;
            const newContent = doc.querySelector(className);
            // check if new content exists
            if (!newContent) {
                console.error(`No element with class name ${className} found in ${url}`);
                return;
            }
            callback(newContent);
        })
}

export { fetchContent };