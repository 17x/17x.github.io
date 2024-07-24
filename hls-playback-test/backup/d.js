const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

// Function to decrypt a segment using the provided key
function decryptSegment(segmentData, key) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, Buffer.alloc(16, 0));
    let decryptedSegment = decipher.update(segmentData, 'base64', 'binary');
    decryptedSegment += decipher.final('binary');
    return decryptedSegment;
}

// Fetch the M3U8 playlist
axios.get('https://example.com/your-video.m3u8')
    .then(response => {
        const playlistContent = response.data;

        // Parse the playlist to extract the key URL and segment URLs

        // Fetch the key file
        axios.get('https://example.com/keyfile.key', { responseType: 'arraybuffer' })
            .then(response => {
                const keyData = response.data;
                const key = Buffer.from(keyData);

                // Fetch and decrypt media segments
                // Loop through segment URLs and decrypt each segment

                // For example, if you have a segment URL, you can fetch and decrypt it like this:
                axios.get('https://example.com/segment1.ts', { responseType: 'arraybuffer' })
                    .then(response => {
                        const encryptedSegmentData = response.data;
                        const decryptedSegmentData = decryptSegment(encryptedSegmentData, key);

                        // Handle the decrypted segment data (e.g., save it to a file, play it, etc.)
                    })
                    .catch(error => {
                        console.error('Error fetching and decrypting segment:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching key file:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching M3U8 playlist:', error);
    });
