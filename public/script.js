async function extractVideoUrl() {
    const pageUrl = document.getElementById('pageUrl').value;
    if (!pageUrl) {
        alert('Please enter a valid URL.');
        return;
    }

    try {
        // Call the backend to extract the video URL
        const response = await fetch('/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: pageUrl }),
        });

        const data = await response.json();

        if (data.videoUrl) {
            document.getElementById('videoUrl').textContent = data.videoUrl;
        } else {
            document.getElementById('videoUrl').textContent = 'Video URL not found.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('videoUrl').textContent = 'Failed to extract video URL.';
    }
}